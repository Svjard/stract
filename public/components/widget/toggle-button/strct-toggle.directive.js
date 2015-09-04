'use strict';

import Register from '../../utils/register';

/**
 * Defines a directive for the toggle button.
 */
class StractToggle {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.templateUrl = 'components/widget/toggle-button/strct-toggle.html';

    this.transclude = true;
    this.controller = 'StractToggleCtrl';
    this.controllerAs = 'StractToggleCtrl';

    // we require ngModel as we want to use it inside our directive
    this.require = 'ngModel';

    // scope values
    this.scope = {};
  }

  /**
   * Keep reference to the model controller
   */
  link($scope, element, attr, ngModelCtrl) {
    $scope.setupModelController = ngModelCtrl;
  }
}

export default StractToggle;

Register.getInstance().directive('strctToggle', StractToggle);
