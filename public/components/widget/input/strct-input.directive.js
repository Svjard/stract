'use strict';

import Register from '../../utils/register';

/**
 * Defines a directive for creating input that are working either on desktop or on mobile devices.
 * It will change upon width of the screen
 */
class StractInput {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict = 'E';
    this.replace= true;
    this.transclude= true;

    // we require ngModel as we want to use it inside our directive
    this.require = ['ngModel'];

    // scope values
    this.scope = {
      valueModel : '=ngModel',
      inputName:'@strctName',
      labelName:'@strctLabelName',
      placeHolder:'@strctPlaceHolder',
      pattern: '@strctPattern',
      myForm: '=strctForm',
      isChanged: '&ngChange'
    };
  }

  /**
   * Template for the current toolbar
   * @param element
   * @param attrs
   * @returns {string} the template
   */
  template(element, attrs) {

      var inputName = attrs.strctName;
      var labelName = attrs.strctLabelName;
      var placeHolder = attrs.strctPlaceHolder;
      var pattern = attrs.strctPattern;

      var template = '<div class="strct-input">'
          + '<md-input-container hide-gt-md>'
          + '<label>' + labelName + '</label>'
          + '<input type="text" name="' + inputName + '"';
      if (attrs.strctPattern) {
          template = template + ' pattern="' + pattern + '"';
      }

      template = template + ' ng-trim="false" data-ng-model="valueModel" >'
          + '<!-- display error messages for the form -->'
          + '<div ng-messages="myForm.' + inputName + '.$error"></div>'
          + '</md-input-container>'
          + ''
          + '    <div class="strct-input-desktop" hide-sm hide-md layout="column" flex>'
          + '<div layout="row" flex layout-align="space-around start">'
          + ' <label flex="15" class="strct-input-desktop-label" ng-if="labelName">' + labelName + ': </label>'
          + ''
          + '<div layout="column" class="strct-input-desktop-value-column" flex="{{labelName ? 85 : 100}}">'
          + '<input type="text" placeholder="' + placeHolder + '" ng-trim="false" name="desk' + inputName + '"';
      if (attrs.strctPattern) {
          template = template + ' pattern="' + pattern + '"';
      }


      template = template + ' data-ng-model="valueModel">'
      + '<!-- display error messages for the form -->'
      + '<div ng-messages="myForm.desk' + inputName + '.$error" ng-transclude></div>'
      + '</div>'
      + '</div>'
      + ' </div>'
      + '</div>';

      return template;
  }


    compile(element, attrs) {

    var keys = Object.keys(attrs);

    // search the input field
    var inputElement = element.find('input');

    var tabIndex;

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
      if ('ngModel' === key) {
        return;
      }
      // add ng-change attr if it exist in the parent element
      if ('ngChange' === key) {
        inputElement.attr('data-ng-change', 'isChanged()');
        return;
      }
      var value = attrs[key];

      // remember tabindex
      if (key === 'tabindex') {
        tabIndex = value;
      }

      // handle empty values as boolean
      if (value === '') {
        value = 'true';
      }

      // set the value of the attribute
      inputElement.attr(attrs.$attr[key], value);


      //add also the material version of max length (only one the first input which is the md-input)
      if ('ngMaxlength' === key) {
        inputElement.eq(0).attr('md-maxlength', value);
      }

      element.removeAttr(attrs.$attr[key]);

    });


    // The focusable element is the input, remove tabIndex from top-level element
    element.attr('tabindex', -1);
    // The default value for tabindex on the input is 0 (meaning: set 0 if no value was set)
    if (!tabIndex) {
      inputElement.attr('tabindex', 0);
    }
  }

  /**
   * Keep reference to the model controller
   */
  link($scope, element, attr) {
    $scope.$watch(function() { return element.is(':visible'); }, function() {
      //Since there are two inputs (for mobile and desktop versions) - add id attr only for visible one:
      if (attr.id) {
        element.find('input:hidden').removeAttr('id');
        element.find('input:visible').attr('id', attr.id);
      }
    });

    $scope.$watch('myForm.desk' + $scope.inputName + '.$pristine', (isPristine) => {
      if (isPristine) {
        element.addClass('desktop-pristine');
      } else {
        element.removeClass('desktop-pristine');
      }
    });
  }
}

export default StractInput;

Register.getInstance().directive('strctInput', StractInput);
