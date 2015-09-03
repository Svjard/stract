'use strict';

import Register from '../../utils/register';

/**
 * @ngdoc controller
 * @name components.controller:StractPanelCtrl
 * @description This class is handling the controller of a panel
 */
class StractPanelCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($scope) {
    this.collapse = false;

    // in lock mode, we're unable to toggle and see the content
    this.locked = false;

    this.id = '';

    this.$scope = $scope;
  }

  /**
   * Sets the id
   * @param id
   */
  setId(id) {
    this.id = id;

    // listener on events
    this.$scope.$on('strctPanel:toggle', (event, data) => {
      if (data === this.id) {
        this.toggle();
      }
    });

    this.$scope.$on('strctPanel:lock', (event, data) => {
      if (data === this.id) {
        this.lock();
      }
    });

    this.$scope.$on('strctPanel:collapse', (event, data) => {
      if (data === this.id) {
        this.collapse = true;
      }
    });

    this.$scope.$on('strctPanel:disabled', (event, data) => {
      if (data && (data.id === this.id)) {
        this.disabled = data.disabled;
      }
    });
  }

  /**
   * @returns true if the panel is collapsed.
   */
  isCollapsed() {
    return this.collapse;
  }

  /**
   * Toggle the collapsed mode
   */
  toggle() {
    this.collapse = !this.collapse;
  }

  /**
   * @returns {string} the icon to display
   */
  getToggleIcon() {
    if (this.locked) {
      return '';
    }

    if (this.isCollapsed()) {
      return 'material-design icon-ic_add_24px';
    } else {
      return 'material-design icon-ic_keyboard_arrow_down_24px';
    }
  }

  lock() {
    this.collapse = true;
    this.locked = true;
  }
}

export default StractPanelCtrl;

Register.getInstance().controller('StractPanelCtrl', StractPanelCtrl);
