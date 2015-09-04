'use strict';

import Register from '../../utils/register';

/**
 * Defines a directive for creating select that are working either on desktop or on mobile devices.
 * It will change upon width of the screen
 */
class StractSelect {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';

    this.replace = true;
    this.transclude = true;
    this.templateUrl = 'components/widget/select/strct-select.html';

    // scope values
    this.scope = {
      value: '=strctValue',
      selectName: '@strctName',
      labelName: '@strctLabelName',
      placeHolder: '@strctPlaceHolder',
      size: '@strctSize',
      myForm: '=strctForm',
      optionValues: '=strctOptionValues'
    };
  }

  compile(element, attrs) {

    var keys = Object.keys(attrs);

    // search the select field
    var selectElements = element.find('select');

    keys.forEach((key) => {

      // don't reapply internal properties
      if (key.indexOf('$') === 0) {
        return;
      }
      // don't reapply internal element properties
      if (key.indexOf('strct') === 0) {
        return;
      }
      // avoid model
      if (key.indexOf('ngModel') === 0) {
        return;
      }
      var value = attrs[key];

      // handle empty values as boolean
      if (value === '') {
        value = 'true';
      }

      // set the value of the attribute
      selectElements.attr(attrs.$attr[key], value);

      element.removeAttr(attrs.$attr[key]);
    });
  }


  /**
   * Keep reference to the model controller
   */
  link($scope, element) {
    // search the select field
    var selectElements = element.find('select');

    $scope.$watch('myForm.desk' + $scope.selectName + '.$pristine', (isPristine) => {
      if (isPristine) {
        element.addClass('desktop-pristine');
      } else {
        element.removeClass('desktop-pristine');
      }

      $scope.$watch('valueModel', (newVal) => {
        if (typeof newVal === 'undefined') {
          return;
        }

        $scope.value = newVal;
        $scope.hideOptions();

        angular.forEach(selectElements, function (selectElement) {
          selectElement.className = newVal === '' ? 'disabled' : '';
        });
      });

      let content = '';
      $scope.optionValues.forEach((optionValue) => {
        content += '<option  value=\'' + (optionValue.id ? optionValue.id : optionValue.name) + '\'>' + optionValue.name + '</option>';
      });

      // Append the value elements in the select element
      selectElements.append(content);

      angular.forEach(selectElements, function (selectElement) {
        selectElement.value = $scope.value;
      });

    });

    $scope.showOptions = function () {
      if ($scope.size && $scope.size > 0) {
        selectElements.attr('size', $scope.size);
      } else {
        // set default value
        selectElements.attr('size', 10);
      }
      selectElements.addClass('strct-select-border');
    };

    $scope.hideOptions = function () {
      selectElements.attr('size', 0);
      selectElements.removeClass('strct-select-border');
    };
  }
}

export default StractSelect;

Register.getInstance().directive('strctSelect', StractSelect);
