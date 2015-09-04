'use strict';

import Register from '../../utils/register';

/**
 * This class is handling the controller for the dropdown
 */
class StractButtonDropdownCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($timeout, $window) {
    this.$timeout = $timeout;
    this.showDropdown = false;
    this.$window = $window;
  }

  toggleDropDown() {
    if (this.isDisabled) {
      this.showDropdown = false;
      return;
    }

    this.showDropdown = !this.showDropdown;
  }

  disableDropDown() {
    this.$timeout(() => {
      this.showDropdown = false;
    }, 300);
  }

  redirect(newPath) {
    if (!newPath || this.isDisabled) {
      return;
    }
    this.$window.location.href = newPath;
  }

}


export default StractButtonDropdownCtrl;

Register.getInstance().controller('StractButtonDropdownCtrl', StractButtonDropdownCtrl);
