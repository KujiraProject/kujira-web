/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'kujira',
    environment: environment,
    baseURL: '/kujira/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      NAMESPACE: "kujira/api/v1",
      SECURED: 'true',

      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-simple-auth'] = {
  //authenticationRoute: 'login',
  baseURL: '/kujira',
  routeAfterAuthentication: 'dashboard',
  routeAfterInvalidation: 'login',
  routeIfAlreadyAuthenticated: 'dashboard',
  //authorizer: 'simple-auth-authorizer:token'
  authorizer: 'authorizer:token',
  crossOriginWhitelist:[
     'http://localhost:5000'
  ]

  }


  ENV['ember-simple-auth-token'] = {
  serverTokenEndpoint: 'http://localhost:5000/authenticate', /*'api/v1/token',*/ //IF YOU WANT TO USE MIRAGE
  identificationField: 'username',
  passwordField: 'password',
  //tokenPropertyName: 'user.token',
  /*authorizationPrefix: 'Bearer ',
  AuthorizationHeaderName: 'Authorization',
  headers: {},
  refreshAccessTokens: true,
   timeFactor: 1,
   refreshLeeway: 300 // Refresh the token 5 minutes (300s) before it expires.*/
}

  if (environment === 'development') {
  // ENV.APP.LOG_RESOLVER = true;
  // ENV.APP.LOG_ACTIVE_GENERATION = true;
  // ENV.APP.LOG_TRANSITIONS = true;
  // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
  // ENV.APP.LOG_VIEW_LOOKUPS = true;
  //ENV.APP.API_HOST = "127.0.0.1:5000";
  ENV['ember-cli-mirage'] = {
    enabled: false
    }

  }


  if (environment === 'dev-api-local') {
  // ENV.APP.LOG_RESOLVER = true;
  // ENV.APP.LOG_ACTIVE_GENERATION = true;
  // ENV.APP.LOG_TRANSITIONS = true;
  // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
  // ENV.APP.LOG_VIEW_LOOKUPS = true;
  //ENV.APP.API_HOST = "127.0.0.1:5000";

  }


  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
