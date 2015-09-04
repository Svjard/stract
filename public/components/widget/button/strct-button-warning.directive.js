
'use strict';

import Register from '../../utils/register';
import StractButton from './strct-button.directive';

/**
 * @ngdoc directive
 * @name components.directive:strctButtonWarning
 * @restrict E
 * @function
 * @element
 *
 * @description
 * `<strct-button-warning>` defines a warning button.
 *
 * @param {string=} strct-button-title the title of the button
 * @param {string=} strct-button-icon the optional icon of the button
 *
 * @usage
 *   <strct-button-warning strct-button-title="hello"></strct-button-warning>
 *
 * @example
 <example module="stract">
 <file name="index.html">
 <strct-button-warning strct-button-title="Hello"></strct-button-warning>
 <strct-button-warning strct-button-title="Hello" strct-button-icon="fa fa-trash"></strct-button-warning>
 </file>
 </example>
 */
class StractButtonWarning extends StractButton {

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
    return '<md-button md-theme=\"warning\" class=\"strct-button md-accent md-raised md-hue-3\"';
  }

}

export default StractButtonWarning;

Register.getInstance().directive('strctButtonWarning', StractButtonWarning);
