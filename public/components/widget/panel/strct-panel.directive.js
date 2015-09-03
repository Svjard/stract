'use strict';

import Register from '../../utils/register';

/**
 * @ngdoc directive
 * @name components.directive:strctPanel
 * @restrict E
 * @function
 * @element
 *
 * @description
 * `<strct-panel>` defines a panel used to insert data.
 *
 * @param {string=} strct-title the title of the panel
 * @param {string=} strct-title-icon icon font prefixing the panel's title
 * @param {string=} strct-title-svg-icon path to SVG image used as panel's title
 * @param {boolean=} strct-toggle boolean used to display or not the panel toggle
 * @param {boolean=} strct-disabled boolean used to add a glass panel over the panel
 *
 * @usage
 *   <strct-panel strct-title="hello"></strct-panel>
 *
 * @example
 <example module="stract">
 <file name="index.html">
 <strct-panel strct-title-icon="fa fa-lock" strct-title="hello">This is simple text</strct-panel>
 </file>
 </example>
 */
class StractPanel {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.replace= true;
    this.transclude= true;
    this.bindToController = true;


    this.controller = 'StractPanelCtrl';
    this.controllerAs = 'StractPanelCtrl';

    this.scope = {
      svgIcon: '@strctTitleSvgIcon',
      title:'@strctTitle',
      disabled: '@strctDisabled'
    };
  }

  /**
   * Defines id of the controller and apply some initial settings
   */

  link(scope, element, attributes, controller) {
    // special mode
    if (attributes['strctLockMode']) {
      controller.lock();
    }

    // special mode
    if (attributes['strctCollapse']) {
      controller.collapse = true;
    }

    // set id
    if (attributes['strctPanelId']) {
      controller.setId(attributes['strctPanelId']);
    }

    // disabled
    if (attributes['strctDisabled']) {
      controller.disabled = true;
    }
  }


  /**
   * Template for the current toolbar
   * @param element
   * @param attrs
   * @returns {string} the template
   */
  template( element, attrs){
    var template = '<md-card class="strct-panel" md-theme="default">'
      + '<div layout="row" class="strct-panel-titlebox" layout-align="start center">'
      + '<div class="strct-panel-title" layout="row" layout-align="start center"'
      + (attrs['strctToggle'] ? ' ng-click="StractPanelCtrl.toggle()">' : '>');

    if (attrs['strctTitleIcon']) {
      template = template + '<span class="strct-panel-title-icon ' + attrs['strctTitleIcon'] + '"></span>';
    }
    if (attrs['strctTitleSvgIcon']) {
      template = template + '<md-icon md-svg-src="' +  '{{StractPanelCtrl.svgIcon}}' + '"></md-icon>';
    }

    template = template + '{{StractPanelCtrl.title}}</div>'
    + '<span flex></span>';

    if (attrs['strctToggle']) {
     template = template +'<i class="{{StractPanelCtrl.getToggleIcon()}}" ng-click="StractPanelCtrl.toggle()"></i>';
    }

    template = template
      + '</div>'
      +  '<md-card-content class="strct-panel-content" ng-hide="StractPanelCtrl.isCollapsed()">'
      +  '<ng-transclude></ng-transclude>'
      +  '</md-card-content>'
      +  '<div class="strct-panel-glass" ng-show="StractPanelCtrl.disabled"></div>'
      +  '</md-card>';

    return template;
  }
}

export default StractPanel;

Register.getInstance().directive('strctPanel', StractPanel);
