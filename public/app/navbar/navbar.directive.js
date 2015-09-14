'use strict';

/**
 * Defines a directive for creating navbar.
 */
class NavBar {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict = 'E';
    this.replace = false;
    this.templateUrl = 'app/navbar/navbar.html';
    this.controller = 'NavbarCtrl';
    this.controllerAs = 'navbarCtrl';
  }
}

export default NavBar;