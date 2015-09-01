'use strict';

import Register from '../../utils/register';
import StractHttpBackend from './stract-http-backend';

/**
 * This class is providing helper methods for simulating a fake HTTP backend simulating
 */
class StractHttpBackendProviderFactory {
  /**
   * Build a new Stract backend based on the given http backend.
   * @param $httpBackend the backend on which to add calls
   * @returns {StractHttpBackend} the new instance
   */
  buildBackend($httpBackend, stractAPIBuilder) {
    // first, add pass through
    $httpBackend.whenGET(new RegExp('components.*')).passThrough();
    $httpBackend.whenGET(new RegExp('^app.*')).passThrough();

    // return instance
    return new StractHttpBackend($httpBackend, stractAPIBuilder);
  }
}


export default StractHttpBackendProviderFactory;

// Register this factory
Register.getInstance().factory('stractHttpBackendProvider', StractHttpBackendProviderFactory);
