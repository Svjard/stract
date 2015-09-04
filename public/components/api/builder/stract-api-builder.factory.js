'use strict';

import Register from '../../utils/register';
import StractProfileBuilder from './stract-profile-builder.js';
import StractUserBuilder from './stract-user-builder.js';

/**
 * This class is providing the entry point for accessing the builders
 */
class StractAPIBuilder {

  /**
   * Default constructor
   * @ngInject for Dependency injection
   */
  constructor () {
  
  }

  /***
   * The Stract Profile builder
   * @returns {StractProfileBuilder}
   */
  getProfileBuilder() {
    return new StractProfileBuilder();
  }

  /***
   * The Stract User builder
   * @returns {StractUserBuilder}
   */
  getUserBuilder() {
    return new StractUserBuilder();
  }
}

export default StractAPIBuilder;

// Register this factory
Register.getInstance().factory('stractAPIBuilder', StractAPIBuilder);
