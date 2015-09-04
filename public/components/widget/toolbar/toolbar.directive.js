'use strict';

import Register from '../../utils/register';

/**
 * @ngdoc directive
 * @name components.directive:strctToolbar
 * @restrict E
 * @function
 * @element
 *
 * @description
 * `<strct-toolbar>` defines a top toolbar.
 *
 * @param {string=} strct-title the title of the toolbar
 * @param {string=} strct-button-name the optional name of the right button
 * @param {string=} strct-button-href the optional link of the right button
 * @param {string=} strct-button-href-target the optional target of the right button
 * @param {string=} strct-breadcrumb-title title of the breadcrumb
 * @param {string=} strct-breadcrumb-href link used by the breadcrumb
 * @param {string=} strct-subheader-title title of the sub header
 * @param {string=} strct-subheader-icon icon of the sub header
 *
 * @usage
 *   <strct-toolbar strct-title="hello"></strct-toolbar>
 *
 * @example
 <example module="stract">
 <file name="index.html">
 <strct-toolbar strct-title="Hello"
               strct-button-name="My Button"
               strct-button-href="http://www.Stract.com"
               strct-breadcrumb-title="My Breadcrumb"
               strct-breadcrumb-href="http://www.Stract.com"
               strct-subheader-title="subtitle"
 ></strct-toolbar>
 </file>
 </example>
 */
class StractToolbar {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.replace = true;
    this.controller = 'NavbarCtrl';
    this.controllerAs = 'controller';
    this.bindToController = true;
  }

  /**
   * Template for the current toolbar
   * @param element
   * @param attrs
   * @returns {string} the template
   */
  template( element, attrs){
    var title = attrs.strctTitle;
    var titleController  = attrs.strctTitleIconsController;
    var buttonHref = attrs.strctButtonHref;
    var buttonHrefTarget = attrs.strctButtonHrefTarget;
    var buttonName = attrs.strctButtonName;

    var breadcrumbTitle = attrs.strctBreadcrumbTitle;
    var breadcrumbHref = attrs.strctBreadcrumbHref;

    var subheaderTitle = attrs.strctSubheaderTitle;
    var subheaderIcon = attrs.strctSubheaderIcon;

    var theme = attrs.theme;

    if (!theme) {
      theme = 'toolbar-theme';
    }

    var template = '<div class=\"strct-toolbar\"><md-toolbar md-theme=\"' + theme +'\">\n'
      + '<div layout=\"column\" flex>'
      + '<div layout=\"row\" flex class=\"strct-toolbar-breadcrumb\" layout-align=\"start center\">'
      + '<button class=\"toolbar-switch\" hide-gt-md ng-click=\"controller.toggleLeftMenu()\" >'
      + '<md-icon md-font-icon=\"fa fa-bars fa-2x\"></md-icon>'
      + '</button>';

    // start href link
    if (breadcrumbHref) {
      template = template + '<a href=\"' + breadcrumbHref + '\" layout=\"row\" layout-align=\"start center\">' +
      '<i class=\"icon-breadcrumb material-design icon-ic_chevron_left_24px\" md-theme=\"default\"></i>';
    }

    if (breadcrumbTitle) {
      template = template + '<span class="strct-toolbar-breadcrumb-title">' + breadcrumbTitle + '</span>';
    }

    // end href link
    if (breadcrumbHref) {
      template = template + '</a>';
    }

    template = template + '</div>'
    + '<div layout=\"row\" flex class=\"strct-toolbar-header\">'
    + '<div class=\"strct-toolbar-title\">'
    + '<span class=\"strct-toolbar-title-label\">'
    + title + '</span><span class=\"strct-toolbar-title-icons\">';
    if (titleController) {
      template = template
      + '<md-icon ng-repeat=\"icon in ' + titleController + '.toolbarIcons\" md-font-icon=\"{{icon.font}}\" ng-click=\"'
      + titleController + '.callbackToolbarClick(icon.name)\"';
    }

    template = template
    + '</span>'
    + '</div>'
    + '<span flex></span>'
    + '<div class=\"strct-toolbar-button\" layout=\"row\">';

    if (buttonName) {
      template = template + '<strct-button-primary strct-button-title=\"' + buttonName + '\" href=\"' + buttonHref + '\"';

      if (buttonHrefTarget) {
        template = template + ' target=\"' + buttonHrefTarget + '\"';
      }

      template = template + '></strct-button-primary>';
    }


    template = template + '</div>'
    + '</div>'
    + '<div layout=\"row\" class=\"strct-toolbar-subheader\">';
    if (subheaderIcon) {
      template = template + '<i class=\"'
      + subheaderIcon
      + '\"></i>';
    }
    if (subheaderTitle) {
      template = template
      + subheaderTitle
      + '</div>';
    }


    template = template
    + '</div>'
    + '</md-toolbar></div>';

    return template;
  }
}

export default StractToolbar;

Register.getInstance().directive('strctToolbar', StractToolbar);
