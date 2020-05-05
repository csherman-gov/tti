import xml.dom.minidom

from api.sfdc_integration.exceptions import (
    SFDC_GeneralError,
    SFDC_ExpiredSession,
    SFDC_MalformedRequest,
    SFDC_MoreThanOneRecord,
    SFDC_RefusedRequest,
    SFDC_ResourceNotFound
)


#pylint: disable=invalid-name
def getUniqueElementValueFromXmlString(xmlString, elementName):
    """
        Extracts an element value from an XML string
        :param xmlString:   XML string.
        :param elementName: The name of the element to search for.
        :return:            Returns the value inside an XML element.
    """
    xmlStringAsDom = xml.dom.minidom.parseString(xmlString)
    elementsByName = xmlStringAsDom.getElementsByTagName(elementName)
    elementValue = None
    if len(elementsByName) > 0:
        elementValue = elementsByName[0].toxml().replace('<' + elementName + '>', '').replace('</' + elementName + '>', '')
    return elementValue


def date_to_iso8601(date):
    """
        Returns a USO8601 formatted string from a Date.
        :param date: Date to format
        :return:     Formatted Date
    """
    dateTimeStr = date.strftime('%Y-%m-%dT%H:%M:%S')
    timeZone_Sign = date.strftime('%z')[0:1]
    timeZone_Str = '%s:%s' % (
        date.strftime('%z')[1:3], date.strftime('%z')[3:5]
    )
    return '{dateTimeStr}{tzsign}{timezone}'.format(
        dateTimeStr=dateTimeStr,
        tzsign=timeZone_Sign,
        timezone=timeZone_Str
    ).replace(':', '%3A').replace('+', '%2B')


def exception_handler(result, name=""):
    """
        Exception router.  Determines which error(s) to raise for bad results.
        :param result:  result of a call to SFDC.
        :param name:    Name of the SFDC Resource being queried.
        :return:        N/A
    """
    try:
        response_content = result.json()
    # pylint: disable=broad-except
    except Exception:
        response_content = result.text

    exc_map = {
        300: SFDC_MoreThanOneRecord,
        400: SFDC_MalformedRequest,
        401: SFDC_ExpiredSession,
        403: SFDC_RefusedRequest,
        404: SFDC_ResourceNotFound,
    }
    exc_cls = exc_map.get(result.status_code, SFDC_GeneralError)

    raise exc_cls(result.url, result.status_code, name, response_content)


def call_salesforce(url, method, session, headers, **kwargs):
    """
        Utility method for performing an HTTP callout to SFDC.
        :param url:     Url to call.
        :param method:  Methd to call
        :param session: Session Id.
        :param headers: Headers needed.
        :param kwargs:  Arguments.
        :return:        a requests.result object.
    """
    additional_headers = kwargs.pop('additional_headers', dict())
    headers.update(additional_headers or dict())
    result = session.request(method, url, headers=headers, **kwargs)

    if result.status_code >= 300:
        exception_handler(result)

    return result
