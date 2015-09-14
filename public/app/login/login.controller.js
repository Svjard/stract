'use strict';

class LoginCtrl {
  /*@ngInject*/
  constructor($http, $cookies, $window, stractAPI, $timeout, $location) {
    this.email = '';
    this.password = '';

    this.$http = $http;
    this.$cookies = $cookies;
    this.$window = $window;
    this.$timeout = $timeout;
    this.stractAPI = stractAPI;
    this.location = $location;

    // hide the navbar
    angular.element('#stractnavbar').parent().hide();
  }

  submit() {
    // reset error message
    this.error = null;
    this.loginInProgress = true;

    var loginData = { 'email': this.email, 'password': this.password };
    this.$http({
      url: '/api/auth/login',
      method: 'POST',
      data: loginData
    }).then((response) => {
      this.$cookies.token = response.data.token;
      this.$window.sessionStorage['stractToken'] = response.data.token;
      this.$cookies.refreshStatus = 'DISABLED';

      // update user
      let promise = this.stractAPI.getUser().refetchUser();
      promise.then(() => this.refresh(), () => this.refresh());
    },  (response) => {
      this.loginInProgress = false;
      console.log('error on login', response);
      this.error = response.data.error || response.statusText;
    });
  }

  refresh() {
    // refresh the home page
    this.$location = '/';
    this.$window.location = '/';
    this.$timeout(() => this.$window.location.reload(), 500);
  }
}

export default LoginCtrl;
