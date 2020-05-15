import os

class Database:

    def __init__(self, domain = 'test'):
        """
            Constructor
            :param domain: Domain provided by the caller.
        """
        self.getUserLoginInfo(domain)

    def getUserLoginInfo(self, domain):
        """
            :param domain: Provided domain.
            :return: populated object with the parameters needed to login to an org
        """
        self.username = os.getenv('SFDC_USERNAME')
        self.password = os.getenv('SFDC_SECRET')
        self.secKey   = os.getenv('SFDC_SECURITY')
        self.orgId    = os.getenv('SFDC_ORGID')
        self.domain   = os.getenv('SFDC_DOMAIN')
