'use strict';

/**
 * This class is providing a builder for User
 */
class StractUserBuilder {

  /**
   * Default constructor.
   */
  constructor() {
    this.user = {};
  }

  /**
   * Sets the email of the user
   * @param email the email to use
   * @returns {StractUserBuilder}
   */
  withEmail(email) {
    this.user.email = email;
    return this;
  }

  /**
   * Sets the id of the user
   * @param id the id to use
   * @returns {StractUserBuilder}
   */
  withId(id) {
    this.user.id = id;
    return this;
  }

  /**
   * Build the user
   * @returns {StractUserBuilder.user|*}
   */
  build() {
    return this.user;
  }
}

export default StractUserBuilder;
