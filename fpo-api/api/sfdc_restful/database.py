import os

class Database:

    def __init__(self, domain = 'dev01'):
        """
            Constructor
            :param domain: Domain provided by the caller.
        """
        self.getUserLoginInfo(domain)

    def getUserLoginInfo(self, domain):
        """
            The I-Don't-Feel-Like-Standing-Up-A-Database database, never to have prod data.
            :param domain: Provided domain.
            :return: populated object with the parameters needed to login to an org.
        """
        if domain == 'dev01':
            self.username = os.getenv('SFDC_USERNAME')  # e.g. 'username'
            self.password = os.getenv('SFDC_SECRET')    # e.g. 'password'
            self.secKey   = os.getenv('SFDC_SECURITY')  # e.g. 'security key'
            self.orgId    = os.getenv('SFDC_ORGID')     # e.g. '00D0i0000008rzU'
            self.domain   = os.getenv('SFDC_DOMAIN')     # e.g. 'test'
        elif domain == 'qa':
            self.username = os.getenv('SFDC_USERNAME')
            self.password = os.getenv('SFDC_SECRET')
            self.secKey   = os.getenv('SFDC_SECURITY')
            self.orgId    = os.getenv('SFDC_ORGID')
            self.domain   = os.getenv('SFDC_DOMAIN')
        elif domain == 'staging':
            self.username = os.getenv('SFDC_USERNAME')
            self.password = os.getenv('SFDC_SECRET')
            self.secKey   = os.getenv('SFDC_SECURITY')
            self.orgId    = os.getenv('SFDC_ORGID')
            self.domain   = os.getenv('SFDC_DOMAIN')
