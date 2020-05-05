DEFAULT_client_id_PREFIX = 'CRTTTI'

from api.sfdc_integration.api import DEFAULT_API_VERSION
from api.sfdc_integration.util import getUniqueElementValueFromXmlString
from api.sfdc_integration.exceptions import SalesforceAuthenticationFailed

# Python version difference(3)
try:
    from cgi import escape
except ImportError:
    from html import escape

import requests
import warnings

def SFDC_Login(
        username = None,
        password = None,
        security_token = None,
        organizationId = None,
        sf_version = DEFAULT_API_VERSION,
        proxies = None,
        session = None,
        client_id = None,
        domain = None
):
    """
        Processes an SFDC Login.
        :param username:        SFDC Username to use for auth
        :param password:        SFDC Password for auth
        :param security_token:  SFDC Security Token for auth
        :param organizationId:  The SFDC org Id (From Company Info)
        :param sf_version       Version of SFDC to use.  If not supplied, uses 38.0
        :param proxies          Optional map of scheme to proxy server.
        :param session          Custom requests session, created in parent code.  This allows usage of other request session features not covered here.
        :param client_id:       The ID of this client
        :param domain:          The domain to use for connecting to SFDC.  Use test/login/SFDC_My_Domain  The code will add the rest of the URL.
        :return:                A tuple(list) of (session_Id, sf_instance)
    """

    if domain is None:
        domain = 'login'

    soap_url = 'https://{domain}.salesforce.com/services/Soap/u/{sf_version}'

    if client_id:
        client_id = "{prefix}/{app_name}".format(
            prefix = DEFAULT_client_id_PREFIX,
            app_name = client_id
        )
    else:
        client_id = DEFAULT_client_id_PREFIX

    soap_url = soap_url.format(
        domain = domain,
        sf_version = sf_version
    )

    # pylint: disable=E0012,deprecated-method
    username = escape(username)
    password = escape(password)

    # Check if authentication token is used
    if security_token is not None:
        login_soap_request_body = """<?xml version="1.0" encoding="utf-8" ?>
        <env:Envelope
                xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:env="http://schemas.xmlsoap.org/soap/envelope/"
                xmlns:urn="urn:partner.soap.sforce.com">
            <env:Header>
                <urn:CallOptions>
                    <urn:client>{client_id}</urn:client>
                    <urn:defaultNamespace>sf</urn:defaultNamespace>
                </urn:CallOptions>
            </env:Header>
            <env:Body>
                <n1:login xmlns:n1="urn:partner.soap.sforce.com">
                    <n1:username>{username}</n1:username>
                    <n1:password>{password}{token}</n1:password>
                </n1:login>
            </env:Body>
        </env:Envelope>""".format(
            username=username,
            password=password,
            token=security_token,
            client_id=client_id
        )
    elif organizationId is not None:
        login_soap_request_body = """<?xml version="1.0" encoding="utf-8" ?>
        <soapenv:Envelope
                xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                xmlns:urn="urn:partner.soap.sforce.com">
            <soapenv:Header>
                <urn:CallOptions>
                    <urn:client>{client_id}</urn:client>
                    <urn:defaultNamespace>sf</urn:defaultNamespace>
                </urn:CallOptions>
                <urn:LoginScopeHeader>
                    <urn:organizationId>{organizationId}</urn:organizationId>
                </urn:LoginScopeHeader>
            </soapenv:Header>
            <soapenv:Body>
                <urn:login>
                    <urn:username>{username}</urn:username>
                    <urn:password>{password}</urn:password>
                </urn:login>
            </soapenv:Body>
        </soapenv:Envelope>""".format(
            username=username,
            password=password,
            organizationId=organizationId,
            client_id=client_id
        )
    elif username is not None and password is not None:
        login_soap_request_body = """<?xml version="1.0" encoding="utf-8" ?>
        <soapenv:Envelope
                xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                xmlns:urn="urn:partner.soap.sforce.com">
            <soapenv:Header>
                <urn:CallOptions>
                    <urn:client>{client_id}</urn:client>
                    <urn:defaultNamespace>sf</urn:defaultNamespace>
                </urn:CallOptions>
            </soapenv:Header>
            <soapenv:Body>
                <urn:login>
                    <urn:username>{username}</urn:username>
                    <urn:password>{password}</urn:password>
                </urn:login>
            </soapenv:Body>
        </soapenv:Envelope>""".format(
            username=username,
            password=password,
            client_id=client_id
        )
    elif    username is not None and \
            consumer_key is not None and \
            privatekey_file is not None:
        header = {'alg': 'RS256'}
        expiration = datetime.utcnow() + timedelta(minutes=3)
        payload = {
            'iss': consumer_key,
            'sub': username,
            'aud': 'https://{domain}.salesforce.com'.format(domain=domain),
            'exp': '{exp:.0f}'.format(exp=time.mktime(expiration.timetuple()) + expiration.microsecond / 1e6)
        }
        with open(privatekey_file, 'rb') as key:
            assertion = jwt.encode(header, payload, key.read())

        login_token_request_data = {
            'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            'assertion': assertion
        }

        return token_login(
            'https://{domain}.salesforce.com/services/oauth2/token'.format(domain=domain),
            login_token_request_data,
            domain,
            consumer_key,
            None,
            proxies,
            session
        )
    # ************************************ #

    else:
        except_code = 'INVALID AUTH'
        except_msg = (
            'You must submit either a security token or organizationId for '
            'authentication'
        )
        raise SalesforceAuthenticationFailed(except_code, except_msg)

    login_soap_request_headers = {
        'content-type': 'text/xml',
        'charset': 'UTF-8',
        'SOAPAction': 'login'
    }

    response = (session or requests).post(
        soap_url,
        login_soap_request_body,
        headers = login_soap_request_headers,
        proxies = proxies
    )

    if response.status_code != 200:
        except_code = getUniqueElementValueFromXmlString(
            response.content,
            'sf:exceptionCode'
        )
        except_msg = getUniqueElementValueFromXmlString(
            response.content,
            'sf:exceptionMessage'
        )
        raise SalesforceAuthenticationFailed(except_code, except_msg)

    session_id = getUniqueElementValueFromXmlString(
        response.content,
        'sessionId'
    )
    server_url = getUniqueElementValueFromXmlString(
        response.content,
        'serverUrl'
    )

    sf_instance = (
        server_url
            .replace('http://', '')
            .replace('https://', '')
            .split('/')[0]
            .replace('-api', '')
    )

    return session_id, sf_instance
