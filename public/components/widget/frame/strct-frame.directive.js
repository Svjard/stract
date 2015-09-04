'use strict';

import Register from '../../utils/register';

class StractFrame {

  /**
   * Default constructor.
   */
  constructor () {
    this.restrict = 'E';
    this.transclude = true;

    // scope values
    this.scope = {
      frameText : '@strctFrameText',
      frameClass:'@strctFrameClass'
    };
  }

  template() {
    return `
      <div layout="row" layout-align="center center" layout-fill>
        <div flex="5" hide-sm hide-md hide-lg>&nbsp;</div>
        <span flex class="{{frameClass}}" ng-if="frameText && frameText.length > 0">
          {{frameText}}
        </span>
        <span class="{{frameClass}}"
              flex
              layout="row" layout-md="column" layout-sm="column"
              layout-align="center center"
              layout-wrap
              ng-if="!frameText || frameText.length < 1">
          <ng-transclude></ng-transclude>
        </span>
        <div flex="5" hide-sm hide-md hide-lg>&nbsp;</div>
      </div>`;
  }
}

export default StractFrame;

Register.getInstance().directive('strctFrame', StractFrame);
