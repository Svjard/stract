'use strict';

import Register from '../../utils/register';

/**
 * Defines a directive for creating List Items that can be checked.
 */
class StractListItemChecked {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';
    this.replace = true;
    this.transclude = true;
    this.templateUrl = 'components/widget/list/strct-list-item-checked.html';

    // we require ngModel as we want to use it inside our directive
    this.require = ['ngModel'];

    // scope values
    this.scope = {
      valueModel: '=?ngModel',
      icon: '@strctIcon',
      ariaLabel: '@strctAriaLabelCheckbox'
    };
  }
}

export default StractListItemChecked;

Register.getInstance().directive('strctListItemChecked', StractListItemChecked);
