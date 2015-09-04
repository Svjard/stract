'use strict';

import Register from '../../utils/register';

/**
 * Defines a directive for the toggle button.
 */
class StractToggleCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($scope) {
    this.$scope = $scope;
  }

  getSelected() {
    return this.$scope.setupModelController.$viewValue;
  }

  getCss(title) {
    if (this.getSelected() !== title) {
      return 'strct-toggle-button-disabled';
    }
    return 'strct-toggle-button-enabled';
  }

  onClick(selected) {
    this.$scope.setupModelController.$setViewValue(selected);
  }
}

export default StractToggleCtrl;

Register.getInstance().controller('StractToggleCtrl', StractToggleCtrl);
