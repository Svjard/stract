'use strict';

import Register from '../utils/register.js';

/**
 * This class is handling the all services API retrieval.
 */
class StractService {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($http) {
    this.$http = $http;
  }

  fetchServices() {
    if (this.servicesPromise) {
      return this.servicesPromise;
    }

    let promise = this.$http.get('/api/');
    this.servicesPromise = promise.then((response) => {
      this.services = [];
      response.data.rootResources.forEach((service) => {
        let path = service.path.charAt(0) === '/' ? service.path.substr(1) : service.path;
        this.services.push(path);
      });
    });

    return this.servicesPromise;
  }

  /**
   * Checks whether service is available.
   * @returns {Boolean|*}
   */
  isServiceAvailable(name) {
    if (!this.services) {
      return false;
    }

    return this.services.indexOf(name) > -1;
  }
}

// Register this factory
Register.getInstance().factory('stractService', StractService);
