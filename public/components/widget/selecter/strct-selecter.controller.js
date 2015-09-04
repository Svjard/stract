'use strict';

import Register from '../../utils/register';

/**
 * This class is handling the controller for the selecter
 */
class StractSelecterCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($scope) {
    this.$scope = $scope;
    this.globalSelecterName = 'unknown';
    this.selectedValuesByKey = new Map();
  }

  /**
   * perform sharing state in an upper scope as it may be shared
   */
  select(globalSelecterName, name) {
    this.globalSelecterName = globalSelecterName;
    this.$scope.$parent.$parent[globalSelecterName + '.selecterSelected'] = name;

    this.$scope.valueModel = this.selectedValuesByKey.get(name);
    this.$scope.callbackController.strctSelecter(name, this.selectedValuesByKey.get(name));
  }

  /**
   * Gets the selected widget among all widgets of this name
   * @returns {*}
   */
  getSelected() {
    return this.$scope.$parent.$parent[this.globalSelecterName + '.selecterSelected'];
  }

  /**
   * Sets the default type for the given category
   * @param category the category to use
   * @param types the available types
   */
  initType(key, values) {
    // set with first value
    this.selectedValuesByKey.set(key, values[0].id);
  }

  /**
   * Event when select operation is called
   * @param category the key of t
   * @param values
   */
  onChangeType(key) {
    // look at the model and define the value
    if (this.$scope.valueModel) {
      // update the selected value
      this.selectedValuesByKey.set(key, this.$scope.valueModel);

      // notify callbacks
      this.$scope.callbackController.strctSelecter(key, this.selectedValuesByKey.get(key));
    }
  }
}

export default StractSelecterCtrl;

Register.getInstance().controller('StractSelecterCtrl', StractSelecterCtrl);
