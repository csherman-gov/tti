""" All exceptions for this package."""

class SFDC_Exception(Exception):
    """Base SFDC API Exception """

    message = u"Unknown error occured for {url}.  Response content: {content}"

    def __init__(self, url, status, resource_name, content):
        """Init SFDC_Exception exception

        This is the base class of exceptions in the package.

        Args:
            url: sfdc url called
            status: status code of the error response
            resource_name: Name of the sfdc resource being queried
            content: body of the response.
        """
        self.url = url
        self.status = status
        self.resource_name = resource_name
        self.content = content

    def __str__(self):
        return self.message.format(url=self.url, content=self.content)

    def __unicode__(self):
        return self.__str__()


class SFDC_MoreThanOneRecord(SFDC_Exception):
    """
        Error Code: 300
        The value returned when the same external Id is not unique.  Response body contains list of records.
    """
    message = u"More than one record for {url}.  Response content: {content}"


class SFDC_MalformedRequest(SFDC_Exception):
    """
        Error Code: 400
        Request can't be understood, likely becase JSON or XML has error
    """
    message = u"Malformed request {url}. Response content: {content}"


class SFDC_ExpiredSession(SFDC_Exception):
    """
        Error Code: 401
        Session Id or OAuth token has expired or is invalid.  THe response body contains message and error code.
    """
    message = u"Expired session for {url}. Response content: {content}"


class SFDC_RefusedRequest(SFDC_Exception):
    """
        Error Code: 403
        The request has been refused. Verify that the logged-in user has appropriate permissions.
    """
    message = u"Request refused for {url}. Response content: {content}"


class SFDC_ResourceNotFound(SFDC_Exception):
    """
        Error Code: 404
        Can't be found, check URI for Errors, and verify no sharing issues
    """
    message = u"Request refused for {url}. Response cotent: {content}"


class SalesforceAuthenticationFailed(SFDC_Exception):
    """
        Error Code: n/a
        Thrown to indicate that authentication with SFDC Failed.
    """
    def __init__(self, code, message):
        self.code = code
        self.message = message

    def __str__(self):
        return u'{code}: {message}'.format(code = self.code, message = self.message)

class SFDC_GeneralError(SFDC_Exception):
    """
        As opposed to AdmiralMistake.  A non-specific Salesforce Error.
    """
    message = u"Error Code {status}.  Response content: {content}"

    def __str__(self):
        return self.message.format(status = self.status, content = self.content)
