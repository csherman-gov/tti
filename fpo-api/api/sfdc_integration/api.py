# Has to be set for anything to work:
DEFAULT_API_VERSION = '42.0'

import logging
import warnings
import requests # Needs to be installed via pip
import json
import re
from collections import namedtuple

# try:
from urllib.parse import urlparse, urljoin
# except ImportError:
#     # Pre-Python 3
#     from urlparse import urlparse, urljoin

from api.sfdc_integration.login import SFDC_Login
from api.sfdc_integration.util import date_to_iso8601, exception_handler
from api.sfdc_integration.exceptions import (
    SFDC_GeneralError
)

from collections import OrderedDict

#pylint: disable=invalid-name
logger = logging.getLogger(__name__)

def _warn_request_deprecation():
    """Deprecation for (Salesforce/SFType).request attribute"""
    warnings.warn(
        'The request attribute has been deprecated and will be removed in a '
        'future version. Please use Salesforce.session instead.',
        DeprecationWarning
    )

Usage = namedtuple('Usage', 'used total')
PerAppUsage = namedtuple('PerAppUsage', 'used total name')


# pylint: disable=too-many-instance-attributes
class Salesforce(object):
    """
        Salesforce Instance
        An instance of Salesforce is a handy way to wrap a Salesforce session
        for easy use of the Salesforce REST API.
    """


    # pylint: disable=too-many-arguments
    def __init__(
            self,
            username=None,
            password=None,
            security_token=None,
            session_id=None,
            instance=None,
            instance_url=None,
            organizationId=None,
            version=DEFAULT_API_VERSION,
            proxies=None,
            session=None,
            client_id=None,
            domain=None
    ):
        """
            Initialize the instance with the given parameters.

            Password Auth
            • username
            • password
            • security_token
            • domain

            Direct Session and Instance Access
            • session_id
            • Either:
                •• instance
                •• instance_url

            Universal Kwargs:
            • version
            • proxies
            • session


            :param username:        SFDC Username
            :param password:        SFDC Password
            :param security_token:  SFDC Security Token
            :param session_id:      Access Token for this session
            :param instance:        Domain of your Salesforce instance, i.e. `na1.salesforce.com`
            :param instance_url:    Full URL of your instance i.e. `https://na1.salesforce.com`
            :param organizationId:
            :param version:         Version of the Salesforce API to use, E.G. `29.0`
            :param proxies:         Optional map of scheme to proxy server
            :param session:         Custom requests session, created in calling code. enables the use of other requests Session features.
            :param client_id:
            :param domain:          Such as 'login' or 'test', or Salesforce My domain.
        """
        if domain is None:
            domain = 'login'

        # Determine if the user passed in the optional version and/or domain kwargs
        self.sf_version = version
        self.domain = domain
        self.session = session or requests.Session()
        self.proxies = self.session.proxies
        # override custom session proxies dance
        if proxies is not None:
            if not session:
                self.session.proxies = self.proxies = proxies
            else:
                logger.warning(
                    'Proxies must be defined on custom session object, '
                    'ignoring proxies: %s', proxies
                )

        # Determine if the user wants to use our username/password auth or pass
        # in their own information
        if all(arg is not None for arg in (username, password, security_token)):
            self.auth_type = "password"

            # Pass along the username/password to our login helper
            self.session_id, self.sf_instance = SFDC_Login(
                session = self.session,
                username = username,
                password = password,
                security_token = security_token,
                sf_version = self.sf_version,
                proxies = self.proxies,
                client_id = client_id,
                domain = self.domain
            )

        elif all(arg is not None for arg in (session_id, instance or instance_url)):
            self.auth_type = "direct"
            self.session_id = session_id

            # If the user provides the full url (as returned by the OAuth
            # interface for example) extract the hostname (which we rely on)
            if instance_url is not None:
                self.sf_instance = urlparse(instance_url).hostname
            else:
                self.sf_instance = instance

        elif all(arg is not None for arg in (username, password, organizationId)):
            self.auth_type = 'ipfilter'

            # Pass along the username/password to our login helper
            self.session_id, self.sf_instance = SFDC_Login(
                session = self.session,
                username = username,
                password = password,
                organizationId = organizationId,
                sf_version = self.sf_version,
                proxies = self.proxies,
                client_id = client_id,
                domain = self.domain
            )
        else:
            raise TypeError('You must provide login information or an instance and token')

        self.auth_site = ( 'https://{domain}.salesforce.com'.format(domain = self.domain) )

        self.headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + self.session_id,
            'X-PrettyPrint': '1'
        }

        self.base_url = (
            'https://{instance}/services/data/v{version}/'
            .format(
                instance = self.sf_instance,
                version = self.sf_version
            )
        )
        self.apex_url = (
            'https://{instance}/services/apexrest/'
            .format(
                instance = self.sf_instance
            )
        )
        self.api_usage = {}

    def apexExecute(
            self,
            action,
            method = 'GET',
            data = None,
            **kwargs
    ):
        """
            Makes an HTTPRequest to an APEX REST Endpoint
            :param action:  The rest endpoint for the request.
            :param method:  HTTP Method for the request (Defaults to GET)
            :param data:    A dict of parameters to send in a POST/PUT request.
            :param kwargs:  Addition args to pass to requests.request.
            :return:    result.
        """

        result = self._call_salesforce(
            method,
            self.apex_url + action,
            name = "apexexcute",
            data = json.dumps(data),
            **kwargs
        )
        try:
            response_content = result.json()
        # pylint: disable=broad-except
        except Exception:
            response_content = result.text

        return response_content

    def _call_salesforce(
        self,
        method,
        url,
        name = "",
        **kwargs
    ):
        """
            Utility method for performing HTTP call to Salesforce.
            :param method:
            :param url:     URL to call out to.
            :param name:    Name of the method calling
            :param kwargs:  Other Args.
            :return:        Returns a `requests.result` object.
        """
        headers = self.headers.copy()
        additional_headers = kwargs.pop('headers', dict())
        headers.update(additional_headers)

        result = self.session.request(
            method,
            url,
            headers = headers,
            **kwargs
        )

        if result.status_code >= 300:
            exception_handler(result, name = name)

        sforce_limit_info = result.headers.get('Sforce-Limit-Info')
        if sforce_limit_info:
            self.api_usage = self.parse_api_usage(sforce_limit_info)

        return result


    @staticmethod
    def parse_api_usage(sforce_limit_info):
        """
            Parse API Usage and limits for the SFDC Governor.
            E.G.
                Example 1: 'api-usage=18/5000'
                Example 2: 'api-usage=25/5000;
            :param sforce_limit_info:   The value of the response header.
            :return: Result.
        """
        result = {}

        api_usage = re.match(r'[^-]?api-usage=(?P<used>\d+)/(?P<tot>\d+)', sforce_limit_info)
        pau = r'.+per-app-api-usage=(?P<u>\d+)/(?P<t>\d+)\(appName=(?P<n>.+)\)'
        per_app_api_usage = re.match(pau, sforce_limit_info)

        if api_usage and api_usage.groups():
            groups = api_usage.groups()
            result['api-usage'] = Usage( used=int(groups[0]), total=int(groups[1]) )
        if per_app_api_usage and per_app_api_usage.groups():
            groups = per_app_api_usage.groups()
            result['per-app-api-usage'] = PerAppUsage( used=int(groups[0]), total=int(groups[1]), name=groups[2] )

        return result
