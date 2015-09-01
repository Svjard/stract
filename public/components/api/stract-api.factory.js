'use strict';

import Register from '../utils/register';
import StractAPIBuilder from './builder/stract-api-builder.factory';
import StractHttpBackendFactory from './test/stract-http-backend.factory';
import StractHttpBackendProviderFactory from './test/stract-http-backend-provider.factory';

import StractUser from './stract-user.factory';
import StractProfile from './stract-profile.factory';
import StractWebsocket from './stract-websocket.factory';
import StractService from './stract-service.factory';

/**
 * This class is providing the entry point for accessing to Stract API
 */
class StractAPI {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor(stractUser, stractProfile, stractWebsocket, stractService) {
    this.stractUser = stractUser;
    this.stractProfile = stractProfile;
    this.stractWebsocket = stractWebsocket;
    this.stractService = stractService;
  }

  /**
   * The Stract User API
   * @returns {StractUser|*}
   */
  getUser() {
    return this.stractUser;
  }

  /**
   * The Stract Profile API
   * @returns {stractProfile|*}
   */
  getProfile() {
    return this.stractProfile;
  }

  /**
   * The Stract Websocket API
   * @returns {stractWebsocket|*}
   */
  getWebsocket() {
    return this.stractWebsocket;
  }

  /**
   * The Stract Services API
   * @returns {stractService|*}
   */
  getService() {
    return this.stractService;
  }
}

export default StractAPI;

// Register this factory
Register.getInstance().factory('stractAPI', StractAPI);
