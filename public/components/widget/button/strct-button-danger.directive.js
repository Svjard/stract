'use strict';

import Register from '../../utils/register';
import StractButton from './strct-button.directive';

/**
 * @ngdoc directive
 * @name components.directive:strctButtonDanger
 * @restrict E
 * @function
 * @element
 *
 * @description
 * `<strct-button-danger>` defines a danger button.
 *
 * @param {string=} strct-button-title the title of the button
 * @param {string=} strct-button-icon the optional icon of the button
 *
 * @usage
 *   <strct-button-danger strct-button-title="hello"></strct-button-danger>
 *
 * @example
 <example module="stract">
 <file name="index.html">
 <strct-button-danger strct-button-title="Hello"></strct-button-danger>
 <strct-button-danger strct-button-title="Hello" strct-button-icon="fa fa-trash"></strct-button-danger>
 </file>
 </example>
 */
class StractButtonDanger extends StractButton {

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
    return '<md-button md-theme=\"danger\" class=\"strct-button md-accent md-raised md-hue-3\"';
  }
}

export default StractButtonDanger;

Register.getInstance().directive('strctButtonDanger', StractButtonDanger);
