'use strict';

/**
 * This class is providing a builder for Profile
 */
class StractProfileBuilder {

  /**
   * Default constructor.
   */
  constructor() {
    this.profile = {};
    this.profile.attributes = {};
  }

  /**
   * Sets the email of the user
   * @param email the email to use
   * @returns {StractProfileBuilder}
   */
  withEmail(email) {
    return this.withAttribute('email', email);
  }

  /**
   * Sets the firstName of the user
   * @param firstName the firstName to use
   * @returns {StractProfileBuilder}
   */
  withFirstName(firstName) {
    return this.withAttribute('firstName', firstName);
  }

  /**
   * Sets the lastName of the user
   * @param lastName the lastName to use
   * @returns {StractProfileBuilder}
   */
  withLastName(lastName) {
    return this.withAttribute('lastName', lastName);
  }

  /**
   * Sets the id of the profile
   * @param id the id to use
   * @returns {StractUserBuilder}
   */
  withId(id) {
    this.profile.id = id;
    this.profile.userId = id;
    return this;
  }

  /**
   * Sets an attribute on the profile
   * @param name the attribute name
   * @param name the attribute value
   * @returns {StractProfileBuilder}
   */
  withAttribute(name, value) {
    this.profile.attributes[name] = value;
    return this;
  }


  /**
   * Build the user
   * @returns {StractProfileBuilder.profile|*}
   */
  build() {
    return this.profile;
  }
}

export default StractProfileBuilder;
