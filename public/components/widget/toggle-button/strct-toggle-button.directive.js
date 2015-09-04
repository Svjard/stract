'use strict';

import Register from '../../utils/register';

/**
 * Defines a directive for a toggle button.
 */
class StractToggleButton {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.templateUrl = 'components/widget/toggle-button/strct-toggle-button.html';

    // scope values
    this.scope = {
      title:'@strctTitle',
      fontIcon: '@strctFontIcon',
      ngDisabled: '@ngDisabled'
    };
  }

  link($scope) {
    $scope.controller = $scope.$parent.$parent.StractToggleCtrl;
  }
}

export default StractToggleButton;

Register.getInstance().directive('strctToggleButton', StractToggleButton);
