
'use strict';

import Register from '../../utils/register';

/**
 * Defines a directive for creating label container.
 */
class StractLabel {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';
    this.replace = true;
    this.transclude = false;
    this.templateUrl = 'components/widget/label/strct-label.html';

    // scope values
    this.scope = {
      labelText:'@strctLabelText'
    };
  }
}

export default StractLabel;

Register.getInstance().directive('strctLabel', StractLabel);
