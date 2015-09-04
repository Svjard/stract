'use strict';

import Register from '../../utils/register';

/**
 * Defines the super class for for all buttons
 */
class StractButtonDropdown {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';
    this.bindToController = true;
    this.templateUrl = 'components/widget/button-dropdown/strct-button-dropdown.html';
    this.controller = 'StractButtonDropdownCtrl';
    this.controllerAs = 'StractButtonDropdownCtrl';

    // scope values
    this.scope = {
      labelText: '@strctButtonDropdownLabel',
      href: '@strctButtonDropdownHref',
      ctrl: '=strctButtonDropdownController',
      isDisabled: '=strctDisabled'
    };
  }

}

export default StractButtonDropdown;

Register.getInstance().directive('strctButtonDropdown', StractButtonDropdown);
