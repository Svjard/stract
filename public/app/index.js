'use strict';

var DEV = true;

// init module
let initModule = angular.module('stract', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute',
  'angular-websocket', 'ui.bootstrap', 'ngMaterial', 'ngMessages', 'angularMoment', 'angular.filter',
  'ngDropdowns', 'ui.gravatar', 'ngLodash', 'angularCharts', 'ngPasswordStrength',
  'gavruk.card', 'uuid4']);


// add a global resolve flag on all routes (user needs to be resolved first)
initModule.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.accessWhen = function(path, route) {
    route.resolve || (route.resolve = {});
    route.resolve.app = ['$q', 'stractProfile', 'stractUser', function ($q, stractProfile, stractUser) {
      var deferred = $q.defer();

      stractUser.fetchUser().then(() => {
        let profilePreferences = stractProfile.getPreferences();
        if (profilePreferences && profilePreferences.$resolved) {
          deferred.resolve();
        } else {
          profilePreferences.$promise.then(() => {
            deferred.resolve();
          }, (error) => {
            deferred.reject(error);
          });
        }
      }, (error) => {
        deferred.reject(error);
      });

      return deferred.promise;
    }];

    return $routeProvider.when(path, route);
  };

  $routeProvider.accessOtherWise = function(route) {
    route.resolve || (route.resolve = {});
    route.resolve.app = ['$q', 'stractProfile', 'stractUser', function ($q, stractProfile, stractUser) {
      var deferred = $q.defer();

      stractUser.fetchUser().then(() => {
        let profilePreferences = stractProfile.getPreferences();
        if (profilePreferences && profilePreferences.$resolved) {
          deferred.resolve();
        } else {
          profilePreferences.$promise.then(() => {
            deferred.resolve();
          }, (error) => {
            deferred.reject(error);
          });
        }
      }, (error) => {
        deferred.reject(error);
      });

      return deferred.promise;
    }];
    return $routeProvider.otherwise(route);
  };
}]);


import Register from '../components/utils/register';

// import components
import ComponentsConfig from '../components/components-config';

import LoginCtrl from './login/login.controller';
import RegisterCtrl from './register/register.controller';

var instanceRegister = Register.getInstance();

// import register
import RegisterConfig from './register/register-config';
new RegisterConfig(instanceRegister);

// and setup controllers
initModule.controller('LoginCtrl', LoginCtrl);

// config routes
initModule.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .accessWhen('/login', {
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'loginCtrl'
    })
    .accessOtherWise({
      redirectTo: '/'
    });
}]);

/**
 * This module check if we have an authenticated user and if not, redirect it to login page
 */
class CheckLogin {
  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor (stractUser) {
    this.stractUser = stractUser;
  }

  checkPage(path) {
    if ('app/login/login.html' === path) {
      return true;
    }
    else if ('app/register/register.html' === path) {
      return true;
    }
    return false;
  }


  checkRedirect() {
    let user = this.stractUser.getUser();
    // User has no email it needs to be logged in
    console.log('user', user);
    if (!user.Email) {
      console.log('change to login');
      return { route:'/login' };
    }

    return {};
  }
}


/**
 * Setup route redirect module
 */
initModule.run(['$rootScope', '$location', 'routingRedirect', 'stractUser', function ($rootScope, $location, routingRedirect, stractUser) {

  /**
   * Add default redirect to login in dev mode
   */
  if (DEV) {
    routingRedirect.addRouteCallback(new CheckLogin(stractUser));
  }

  $rootScope.$on('$routeChangeStart', (event, next)=> {
    if (DEV) {
      console.log('$routeChangeStart event with route', next);
    }
  });

  // When a route is about to change, notify the routing redirect node
  $rootScope.$on('$routeChangeSuccess', (event, next) => {
    if (next.resolve) {
      if (DEV) {
        console.log('$routeChangeSuccess event with route', next);
      }// check routes
      routingRedirect.check(event, next);
    }
  });

  $rootScope.$on('$routeChangeError', () => {
    $location.path('/');
  });
}]);

// add interceptors
initModule.factory('AuthInterceptor', function ($window, $cookies, $q, $location, $log) {
  return {
    request: function(config) {
      console.log('auth in');

      //remove prefix url
      if (config.url.indexOf('https://stract.com/api') === 0) {
        config.url = config.url.substring('https://stract.com'.length);
      }

      //Do not add token on auth login
      if (config.url.indexOf('/api/auth/login') === -1 && config.url.indexOf('api/') !== -1 && $window.sessionStorage['stractToken']) {
        config.params = config.params || {};
        angular.extend(config.params, {token: $window.sessionStorage['stractToken']});
      }
      return config || $q.when(config);
    },
    response: function(response) {
      return response || $q.when(response);
    },
    responseError: function (rejection) {

      // handle only api call
      if (rejection.config.url.indexOf('localhost') > 0 || rejection.config.url.indexOf('/api/user') > 0) {
        if (rejection.status === 401 || rejection.status === 403) {
          $log.info('Redirect to login page.');
          $location.path('/login');

        }
      }
      return $q.reject(rejection);
    }
  };
});

// add interceptors
initModule.factory('ETagInterceptor', function ($window, $cookies, $q) {
  var etagMap = {};
  return {
    request: function(config) {
      // add IfNoneMatch request on the stract api if there is an existing eTag
      if ('GET' === config.method) {
        if (config.url.indexOf('/api') === 0) {
          let eTagURI = etagMap[config.url];
          if (eTagURI) {
            config.headers = config.headers || {};
            angular.extend(config.headers, {'If-None-Match': eTagURI});
          }
        }
      }
      return config || $q.when(config);
    },
    response: function(response) {
      // if response is ok, keep ETag
      if ('GET' === response.config.method) {
        if (response.status === 200) {
          var responseEtag = response.headers().etag;
          if (responseEtag) {
            if (response.config.url.indexOf('/api') === 0) {

              etagMap[response.config.url] =  responseEtag;
            }
          }
        }

      }
      return response || $q.when(response);
    }
  };
});

// add interceptors
initModule.factory('LogInterceptor', function ($q) {
  return {
    request: function(config) {
      console.log('RemoteCall:', config.url, config.method);
      return config || $q.when(config);
    },
    response: function(response) {
      //console.log('RemoteCall:', response);
      return response || $q.when(response);
    }
  };
});

initModule.constant('stractConfig', {
  developmentMode: DEV
});

initModule.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
  if (DEV) {
    //$httpProvider.interceptors.push('AuthInterceptor');
    $httpProvider.interceptors.push('LogInterceptor');
  }

  // Add the ETag interceptor for stract API
  //$httpProvider.interceptors.push('ETagInterceptor');
}]);

angular.module('ui.gravatar').config(['gravatarServiceProvider', function(gravatarServiceProvider) {
    gravatarServiceProvider.defaults = {
      size     : 43,
      default: 'mm'  // Mystery man as default for missing avatars
    };

    // Use https endpoint
    gravatarServiceProvider.secure = true;
  }
]);
