'use strict';

import Register from '../../utils/register';
import StractButton from './strct-button.directive';

/**
 * @ngdoc directive
 * @name components.directive:strctButtonPrimary
 * @restrict E
 * @function
 * @element
 *
 * @description
 * `<strct-button-primary>` defines a default button.
 *
 * @param {string=} strct-button-title the title of the button
 * @param {string=} strct-button-icon the optional icon of the button
 *
 * @usage
 *   <strct-button-primary strct-button-title="hello"></strct-button-primary>
 *
 * @example
 <example module="stract">
 <file name="index.html">
 <strct-button-primary strct-button-title="Hello"></strct-button-primary>
 <strct-button-primary strct-button-title="Hello" strct-button-icon="fa fa-file-text-o"></strct-button-primary>
 </file>
 </example>
 */
class StractButtonPrimary extends StractButton {

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
    return '<md-button md-theme=\"default\" class=\"strct-button md-accent md-raised md-hue-2\"';
  }

}

export default StractButtonPrimary;

Register.getInstance().directive('strctButtonPrimary', StractButtonPrimary);
