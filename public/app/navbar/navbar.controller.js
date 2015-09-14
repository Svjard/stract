'use strict';

class NavBarCtrl {

  /**
   * Default constructor
   * @ngInject for Dependency injection
   */
  constructor($mdSidenav, stractConfig, stractAPI) {
    this.mdSidenav = $mdSidenav;
    this.stractAPI = stractAPI;
    this.stractUser = stractAPI.getUser();

    let promiseUser = this.stractUser.fetchUser();
    promiseUser.then(() => {

    });

    this.profile = stractAPI.getProfile().getProfile();
    if (this.profile.attributes) {
      this.email = this.profile.attributes.email;
    } else {
      this.profile.$promise.then(() => {
        this.email = this.profile.attributes ? this.profile.attributes.email : null;
      });
    }
  }

  /**
   * Toggle the left menu
   */
  toggleLeftMenu() {
    this.mdSidenav('left').toggle();
  }
}

export default NavBarCtrl;