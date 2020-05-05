from api.sfdc_integration import Salesforce

from .database import Database

class SFDC:

    def __init__(self, domain):
        """
            Constructor
            :param domain: domain to get credentials for (currently, dev01/qa/staging)
        """
        self.sfLogin(domain)

    def sfLogin(self, domain = 'dev01'):
        """
            Logs into the requested salesforce org.
            :param domain: domain to get credentials for.
            :return: instance of the sfdc object.
        """
        db = Database(domain)
        try:
            self.sf = Salesforce(
                username        = db.username,
                password        = db.password,
                security_token  = db.secKey,
                client_id       = 'flask',
                organizationId  = db.orgId,
                domain          = db.domain
            )
        except NameError:
            print(NameError)
        return self.sf



    def submitForm(self, url, payload):
        """
            Calls Apex at the requested REST URL, passing in the provided payload.
            :param url:     Specific part of the url set by APEX in salesforce.
            :param payload: JSON payload to provide to apex.
            :return: Returns the result from Salesforce.
        """
        self.result = self.sf.apexExecute(url, method = 'POST', data = payload)
        return self.result
