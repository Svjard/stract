'use strict';

import RegisterAccount from '../register/register-account.directive';
import RegisterCtrl from '../register/register.controller';

class RegisterConfig {

  constructor(register) {
    register.directive('registerAccount', RegisterAccount);

    register.controller('RegisterCtrl', RegisterCtrl);

    // config routes
    register.app.config(function ($routeProvider) {
      let locationProvider = {
        templateUrl: 'app/register/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'registerCtrl'
      };

      $routeProvider.accessWhen('/register', locationProvider);
    });
  }
}

export default RegisterConfig;