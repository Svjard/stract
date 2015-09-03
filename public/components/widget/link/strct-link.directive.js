'use strict';

import Register from '../../utils/register';

/**
 * Defines the link component.
 * Uses the following options:
 * * strct-link-text for the visible content text of the link
 * * ng-href fot the destination url
 * * target fot the HTML link target value (_self, _blank, _parent, _top) - see {@link https://developer.mozilla.org/fr/docs/Web/HTML/Element/a#attr-target}
 * * strct-no-padding if truthy, do not add the horizontal and vertical padding and margin
 */
class StractLink {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict = 'E';
    this.bindToController = true;
  }

  /**
   * Template for the link component.
   * @param element
   * @param attrs
   * @returns {string} the template
   */
  template( element, attrs) {
    let linkText = attrs['strctLinkText'] || '';
    let destination = attrs.ngHref ? `ng-href="${attrs.ngHref}"` : '';
    let noPadding = attrs.hasOwnProperty('strctNoPadding') ? 'strct-link-no-padding' : '';
    let target = '';
    if (attrs.target) {
      target = `target="${attrs.target}"`;
    } else if (attrs.hasOwnProperty('strctSameWindow')) {
      target = 'target="_top"';
    } else if (attrs.hasOwnProperty('strctNewWindow')) {
      target = 'target="_blank"';
    } else if (attrs.hasOwnProperty('strctSameFrame')) {
      target = 'target="_self"';
    }

    var template = `<a strct-link md-theme="default" class="strct-link ${noPadding} md-primary md-no-ink md-hue-2" ${destination} ${target}>${linkText}</a>`;

    return template;
  }


}

export default StractLink;

Register.getInstance().directive('strctLink', StractLink);
