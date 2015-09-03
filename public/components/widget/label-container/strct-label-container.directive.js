'use strict';

import Register from '../../utils/register';

/**
 * Defines a directive for creating label container.
 */
class StractLabelContainer {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.replace = true;
    this.transclude = true;
    this.templateUrl = 'components/widget/label-container/strct-label-container.html';

    // scope values
    this.scope = {
      labelName:'@strctLabelName'
    };
  }
}

export default StractLabelContainer;

Register.getInstance().directive('strctLabelContainer', StractLabelContainer);
