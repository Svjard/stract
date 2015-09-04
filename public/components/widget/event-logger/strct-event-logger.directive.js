'use strict';

import Register from '../../utils/register';

/**
 * Defines a directive for logging user UI events.
 */
class StractEventLogger {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor (StractAPI) {
    this.restrict = 'A';
    this.StractAPI = StractAPI;
  }

  link($scope, element, attr) {
    element.on('click', () => {
      this.StractAPI.getAnalytics().logAction(attr.strctEventLogger);
    });
  }
}

export default StractEventLogger;

Register.getInstance().directive('strctEventLogger', StractEventLogger);
