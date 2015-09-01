'use strict';

import Register from '../utils/register.js';

/**
 * This class is handling the profile API retrieval
 */
class StractProfile {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($resource) {

    // keep resource
    this.$resource = $resource;

    // remote call
    this.remoteProfileAPI = this.$resource('/api/profile', {}, {
      getById: {method: 'GET', url: '/api/profile/:userId'},
      setAttributes: {method: 'POST', url: '/api/profile'}
    });

    // remote call for preferences
    this.remoteProfilePreferencesAPI = this.$resource('/api/profile/prefs');

    this.profileIdMap = new Map();

    // fetch the profile when we're initialized
    this.fetchProfile();

    // fetch the profilePreferences when we're initialized
    this.fetchPreferences();
  }

  /**
   * Gets the profile
   * @return profile
   */
  getProfile() {
    return this.profile;
  }

  /**
   * Gets the preferences
   * @return preferences
   */
  getPreferences() {
    return this.profilePreferences;
  }

  /**
   * Update the preferences
   * @param properties
   */
  updatePreferences(properties) {
    angular.extend(this.profilePreferences, properties);
    this.profilePreferences.$save();
  }

  /**
   * Remove preferences properties
   * @param properties (list of keys)
   */
  removePreferences(properties) {
    this.remoteProfilePreferencesAPI.delete(properties);
  }

  /**
   * Gets the full name if it possible
   * @returns {string} full name
   */
  getFullName(attributes) {
    if (!attributes) {
      return '';
    }
    
    let firstName = attributes.firstName;
    if (!firstName) {
      firstName = '';
    }
    
    let lastName = attributes.lastName;
    if (!lastName) {
      lastName = '';
    }

    return firstName + ' ' + lastName;
  }

  /**
   * Gets the profile data
   */
  fetchProfile() {
    let profile = this.remoteProfileAPI.get();
    // if we don't yet have data
    if (!this.profile) {
      // set  profile for using promise in controllers during first request
      this.profile = profile;
    }

    let profilePromise = profile.$promise;

    profilePromise.then((profile) => {
      // update profile data if we have new value
      this.profile = profile;
      this.profileIdMap.set(profile.userId, profile);
    });

    return profilePromise;
  }

  /**
   * Gets the preferences data
   */
  fetchPreferences() {
    let profilePreferences = this.remoteProfilePreferencesAPI.get();
    // if we don't yet have data
    if (!this.profilePreferences) {
      // set profilePreferences for using promise in controllers during first request
      this.profilePreferences = profilePreferences;
    }

    let profilePrefsPromise = this.profilePreferences.$promise;

    profilePrefsPromise.then((profilePreferences) => {
      // update profilePreferences data if we have new value
      this.profilePreferences = profilePreferences;
    });

    return profilePrefsPromise;
  }

  /**
   * Set the profile attributes data
   * @param attributes
   * @returns {$promise|*|T.$promise}
   */
  setAttributes(attributes) {
    let promise = this.remoteProfileAPI.setAttributes(attributes).$promise;

    return promise;
  }

  /**
   * Fetch the profile from the given userId
   * @param userId the user for which we will call remote api and get promise
   * @returns {*} the promise
   */
  fetchProfileId(userId) {
    let promise = this.remoteProfileAPI.getById({userId: userId}).$promise;
    let parsedResultPromise = promise.then((profile) => {
      this.profileIdMap.set(userId, profile);
    });

    return parsedResultPromise;
  }

  getProfileFromId(userId) {
    return this.profileIdMap.get(userId);
  }
}

// Register this factory
Register.getInstance().factory('stractProfile', StractProfile);
