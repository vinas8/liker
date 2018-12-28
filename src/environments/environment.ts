// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDtCminc6v_UsicIkbwmvFNKTMas6PSJTE',
    authDomain: 'like-master.firebaseapp.com',
    databaseURL: 'https://like-master.firebaseio.com',
    projectId: 'like-master',
    storageBucket: 'like-master.appspot.com',
    messagingSenderId: '1018633449255'
  },
  actionCodeSettings: {
    // Your redirect URL
    url: 'http://localhost:4205/login',
    handleCodeInApp: true,
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
