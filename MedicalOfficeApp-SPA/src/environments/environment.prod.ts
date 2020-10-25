export const mainUrl = {
  url: 'api/'
};

export const environment = {
  production: true,
  backEndTimeZone: '+0300',
  allowedDomains: ['localhost:5000'],
  mainPageUrl: 'https://vimpa.by',
  apiUrl: mainUrl.url,
  apiClientUrl: mainUrl.url + 'client/',
  apiDatetimeUrl: mainUrl.url + 'datetime/',
  apiRecordsUrl: mainUrl.url + 'records/',
  apiAdminLoginUrl: mainUrl.url + 'admin/auth/login'
};
