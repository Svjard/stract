'use strict';

/**
 * Defines the super class for for all buttons
 */
class StractButton {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict = 'E';
    this.bindToController = true;
  }

  /**
   * Template for the current toolbar
   * @param element
   * @param attrs
   * @returns {string} the template
   */
  template(element, attrs) {
    var template = this.getTemplateStart();

    if (attrs.href) {
      template = template + ` href="${attrs.href}"`;
    }

    if (attrs.target) {
      template = template + ` target="${attrs.target}"`;
    }

    if (attrs.ngClick) {
      template = template + ` ng-click="${attrs.ngClick}"`;
    }

    template = template + '>';

    if (attrs.strctButtonIcon) {
      template = template + `<md-icon md-font-icon="${attrs.strctButtonIcon}" flex layout="column" layout-align="start center"></md-icon>`;
    }


    template = template + attrs['strctButtonTitle'] + '</md-button>';
    return template;
  }

  compile(element, attrs) {
    let button = element.find('button');
    if (attrs && attrs.tabindex) {
      button.attr('tabindex', attrs.tabindex);
    } else {
      button.attr('tabindex', 0);
    }
    // top level element doesn't have tabindex, only the button has
    element.attr('tabindex', -1);

    attrs.$set('ngClick', undefined);
  }

  /**
   * Re-apply ng-disabled on child
   */
  link($scope, element, attrs) {
    $scope.$watch(attrs.ngDisabled, function (isDisabled) {
      element.find('button').prop('disabled', isDisabled);
    });

  }

}

export default StractButton;
