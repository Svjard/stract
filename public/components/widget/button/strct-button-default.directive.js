'use strict';

import Register from '../../utils/register';
import StractButton from './strct-button.directive';

/**
 * @ngdoc directive
 * @name components.directive:strctButtonDefault
 * @restrict E
 * @function
 * @element
 *
 * @description
 * `<strct-button-default>` defines a default button.
 *
 * @param {string=} strct-button-title the title of the button
 * @param {string=} strct-button-icon the optional icon of the button
 *
 * @usage
 *   <strct-button-default strct-button-title="hello"></strct-button-default>
 *
 * @example
 <example module="stract">
 <file name="index.html">
 <strct-button-default strct-button-title="Hello"></strct-button-default>
 <strct-button-default strct-button-title="Hello" strct-button-icon="fa fa-check-square"></strct-button-default>
 </file>
 </example>
 */
class StractButtonDefault extends StractButton {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    super();
  }


  /**
   * Template for the buttons
   */
  getTemplateStart() {
    return '<md-button md-theme=\"strctdefault\" class=\"strct-button md-accent md-raised md-hue-2\"';
  }

}

export default StractButtonDefault;

Register.getInstance().directive('strctButtonDefault', StractButtonDefault);
