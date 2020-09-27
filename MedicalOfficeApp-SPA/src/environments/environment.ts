// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const mainUrl = {
  url: 'http://45.80.69.247:5001/'
  // url: 'http://localhost:5000/'
};

export const environment = {
  production: false,
  backEndTimeZone: '+0300',
  allowedDomains: ['45.80.69.247:5001', 'localhost:5000'], // tmp
  mainPageUrl: 'https://vimpa.by',
  apiUrl: mainUrl.url,
  apiClientUrl: mainUrl.url + 'api/client/',
  apiDatetimeUrl: mainUrl.url + 'api/datetime/',
  apiRecordsUrl: mainUrl.url + 'api/records/',
  apiAdminLogin: mainUrl.url + 'api/admin/auth/login'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
