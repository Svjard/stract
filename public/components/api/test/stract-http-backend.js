'use strict';

import Register from '../../utils/register';

/**
 * This class is providing helper methods for simulating a fake HTTP backend simulating
 */
class StractHttpBackend {

  /**
   * Constructor to use
   */
  constructor($httpBackend, stractAPIBuilder) {
    this.httpBackend = $httpBackend;
    this.userIdMap = new Map();
    this.userEmailMap = new Map();
    this.profilesMap = new Map();

    this.defaultUser = stractAPIBuilder.getUserBuilder().withId('idDefaultUser').withEmail('defaultUser@stractsim.com').build();
    this.defaultProfile = stractAPIBuilder.getProfileBuilder().withId('idDefaultUser').withEmail('defaultUser@stractsim.com').withFirstName('FirstName').withLastName('LastName').build();
    this.defaultProfilePrefs = {};
  }

  /**
   * Setup all data that should be retrieved on calls
   */
  setup() {
    //users
    this.httpBackend.when('GET', '/api/user').respond(this.defaultUser);
    var userIdKeys = this.userIdMap.keys();
    for (let key of userIdKeys) {
      this.httpBackend.when('GET', '/api/user/' + key).respond(this.userIdMap.get(key));
    }
    var userEmailKeys = this.userEmailMap.keys();
    for (let key of userEmailKeys) {
      this.httpBackend.when('GET', '/api/user/find?email=' + key).respond(this.userEmailMap.get(key));
    }
    //profiles
    this.httpBackend.when('GET', '/api/profile').respond(this.defaultProfile);
    this.httpBackend.when('GET', '/api/profile/prefs').respond(this.defaultProfilePrefs);
    var profileKeys = this.profilesMap.keys();
    for (let key of profileKeys) {
      this.httpBackend.when('GET', '/api/profile/' + key).respond(this.profilesMap.get(key));
    }
  }

  /**
   * Add the given user
   * @param user
   */
  setDefaultUser(user) {
    this.defaultUser = user;
  }

  /**
   * Add the given user to userIdMap
   * @param user
   */
  addUserId(user) {
    this.userIdMap.set(user.id, user);
  }

  /**
   * Add the given user to userEmailMap
   * @param user
   */
  addUserEmail(user) {
    this.userEmailMap.set(user.email, user);
  }

  /**
   * Set new user password
   * @param password
   */
  setPassword() {
    this.httpBackend.when('POST', '/api/user/password').respond(() => {
      return [200, {success: true, errors: []}];
    });
  }

  /**
   * Add the given profile
   * @param profile
   */
  addDefaultProfile(profile) {
    this.defaultProfile = profile;
  }

  /**
   * Add the given profile
   * @param profile
   */
  addProfileId(profile) {
    this.profilesMap.put(profile.id, profile);
  }

  /**
   * Set attributes of the current user
   * @param attributes
   */
  setAttributes(attributes) {
    this.httpBackend.when('POST', '/api/profile').respond(attributes);
    this.defaultProfile.attributes = attributes;
  }

  /**
   * Gets the internal http backend used
   * @returns {StractHttpBackend.httpBackend|*}
   */
  getHttpBackend() {
    return this.httpBackend;
  }
}

export default StractHttpBackend;

// Register this factory
Register.getInstance().factory('stractHttpBackend', StractHttpBackend);
