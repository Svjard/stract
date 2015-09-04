'use strict';

import Register from '../../utils/register';

/**
 * Defines a directive for the selecter.
 */
class StractSelecter {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    //this.replace= true;
    //this.transclude= true;
    this.templateUrl = 'components/widget/selecter/strct-selecter.html';

    // we require ngModel as we want to use it inside our directive
    this.require = ['ngModel'];

    this.controller = 'StractSelecterCtrl';
    this.controllerAs = 'StractSelecterCtrl';
    //this.bindToController = true;

    // scope values
    this.scope = {
      valueModel : '=ngModel',
      title: '@strctTitle',
      options: '@strctOptions', /* uses ngOptions syntax */
      values: '=strctValues', /* source of the select values _in parent scope_ */
      name: '@strctName',
      icon: '@strctIcon',
      callbackController: '=strctCallbackController' /* object with a strctSelecter(name, valueSelected) function, called when the selecter is selector or the select value changes */
    };
  }

  link($scope, element) {
    // defines the first element as selected
    if ($scope.$parent.$first) {
      $scope.$parent.$parent[$scope.name + '.selecterSelected'] = $scope.title;
    }

    let selectElement = element.find('select');
    //fixes: first click on select element is not handled as clicked event on whole selected component:
    selectElement.bind('mousedown', function() {
      selectElement.click();
    });
  }
}

export default StractSelecter;

Register.getInstance().directive('strctSelecter', StractSelecter);
