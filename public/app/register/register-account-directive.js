'use strict';

/**
 * Defines a directive for the account registration widget.
 */
class RegisterAccount {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';
    this.replace = false;
    this.templateUrl = 'app/register/register-account.html';

    // scope values
    this.scope = {
      this.email: '=strctEmail',
      this.password: '=strctPassword'
    };

  }

  /**
   * Keep reference to the model controller
   */
  link($scope) {
    $scope.$watch('registrationForm.$pristine', () => {
      $scope.$watch('password', (newVal) => {
        if ($scope.registrationForm.$invalid || ($scope.confirmPassword !== newVal)) {
          $scope.password = null;
          return;
        }
        $scope.password = newVal;
      });
      $scope.$watch('confirmPassword', (newVal) => {
        if ($scope.registrationForm.password.$invalid || ($scope.password !== newVal)) {
          $scope.password = null;
          return;
        }
        $scope.password = newVal;
      });
    });
  }
}

export default RegisterAccount;
