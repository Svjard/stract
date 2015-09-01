'use strict';

import Register from '../../utils/register';
import StractHttpBackend from './stract-http-backend';

/**
 * This class is providing helper methods for simulating a fake HTTP backend simulating
 */
class StractHttpBackendFactory extends StractHttpBackend {

  /**
   * Default constructor
   * @ngInject for Dependency injection
   */
  constructor($httpBackend, stractAPIBuilder) {
    super($httpBackend, stractAPIBuilder);
  }
}

export default StractHttpBackendFactory;

// Register this factory
Register.getInstance().factory('stractHttpBackend', StractHttpBackendFactory);
