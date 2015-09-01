'use strict';

import Register from '../../components/utils/register.js';

/**
 * Provides custom notifications
 */
class StractNotification {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($mdToast) {
    this.$mdToast = $mdToast;
  }

  showInfo(text) {
    this.$mdToast.hide();
    this.$mdToast.show({
      template: '<md-toast class="strct-notification-info"><span flex>' + text + '</span></md-toast>',
      hideDelay: 3000
    });
  }

  showError(text) {
    this.$mdToast.hide();
    this.$mdToast.show({
      template: '<md-toast class="strct-notification-error">' +
      '<span flex><b>Failed!</b> ' + text + '</span>' +
      '<md-button ng-click="hideNotification()">Close</md-button>' +
      '</md-toast>',
      controller: ['$scope', ($scope) => {
        $scope.hideNotification = this.$mdToast.hide;
      }],
      hideDelay: 20000
    });
  }
}

export default StractNotification;

// Register this factory
Register.getInstance().factory('stractNotification', StractNotification);
