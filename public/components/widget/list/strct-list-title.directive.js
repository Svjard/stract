'use strict';

import Register from '../../utils/register';

/**
 * Defines a directive for the title of list.
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
    this.templateUrl = 'components/widget/list/strct-list-title.html';

    // scope values
    this.scope = {
      icon:'@strctIcon'
    };
  }
}

export default StractList;

Register.getInstance().directive('strctListTitle', StractList);
