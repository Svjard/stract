'use strict';

import Register from '../../utils/register';

/**
 * Defines a directive for creating Lists.
 */
class StractList {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.replace= true;
    this.transclude= true;
    this.templateUrl = 'components/widget/list/strct-list.html';
  }
}

export default StractList;

Register.getInstance().directive('strctList', StractList);
