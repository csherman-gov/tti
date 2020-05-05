"""
    Based heavily on simple_salesforce Python Integration.
    Removed essentially all pieces of integration except login and apexecute.
    Improved documentation of methods and formatting.
"""

from api.sfdc_integration.api import (
    Salesforce
)

from api.sfdc_integration.login import (
    SFDC_Login
)

from api.sfdc_integration.exceptions import (
    SFDC_Exception,
    SFDC_MoreThanOneRecord,
    SFDC_ExpiredSession,
    SFDC_RefusedRequest,
    SFDC_ResourceNotFound,
    SFDC_GeneralError,
    SFDC_MalformedRequest,
    SalesforceAuthenticationFailed
)
