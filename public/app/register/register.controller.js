'use strict';

class RegisterCtrl {
  /*@ngInject*/
  constructor($http, $cookies, $window, stractAPIBuilder, $timeout, $location) {
    this.email = '';
    this.password = '';
    this.verifyPassword = '';

    this.$http = $http;
    this.$cookies = $cookies;
    this.$window = $window;
    this.$timeout = $timeout;
    this.stractAPIBuilder = stractAPIBuilder;
    this.location = $location;

    // hide the navbar
    angular.element('#stractnavbar').parent().hide();
  }

  submit() {
    // reset error message
    this.error = null;
    this.registrationInProgress = true;

    var registractionData = { 'email': this.email, 'password': this.password };
    var newUser = this.stractAPIBuilder.getUserBuilder().withEmail(this.email).withPassword(this.password).build();
    newUser.registerUser()

    /*
    this.$http({
      url: '/api/auth/login',
      method: 'POST',
      data: loginData
    }).then((response) => {
      this.$cookies.token = response.data.value;
      this.$window.sessionStorage['stractToken'] = response.data.value;
      this.$cookies.refreshStatus = 'DISABLED';

      // update user
      let promise = this.stractAPI.getUser().refetchUser();
      promise.then(() => this.refresh(), () => this.refresh());
    },  (response) => {
      this.loginInProgress = false;
      console.log('error on login', response);
      this.error = response.data.error || response.statusText;
    });*/
  }

  refresh() {
    // refresh the home page
    this.$location = '/';
    this.$window.location = '/';
    this.$timeout(() => this.$window.location.reload(), 500);
  }
}

export default RegisterCtrl;
