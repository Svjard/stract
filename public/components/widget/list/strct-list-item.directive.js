'use strict';

import Register from '../../utils/register';

/**
 * Defines a directive for creating List Items.
 */
class StractListItem {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.replace= true;
    this.transclude= true;
    this.templateUrl = 'components/widget/list/strct-list-item.html';
  }
}

export default StractListItem;

Register.getInstance().directive('strctListItem', StractListItem);
