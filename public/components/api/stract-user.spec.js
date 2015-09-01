'use strict';

/**
 * Test of the StractUser
 */
describe('StractUser', function () {

  /**
   * User Factory for the test
   */
  var factory;

  /**
   * API builder.
   */
  var apiBuilder;

  /**
   * Backend for handling http operations
   */
  var httpBackend;

  /**
   * Stract backend
   */
  var stractBackend;

  /**
   *  setup module
   */
  beforeEach(module('stract'));

  /**
   * Inject factory and http backend
   */
  beforeEach(inject(function (stractUser, stractAPIBuilder, stractHttpBackend) {
    factory = stractUser;
    apiBuilder = stractAPIBuilder;
    stractBackend = stractHttpBackend;
    httpBackend = stractHttpBackend.getHttpBackend();
  }));

  /**
   * Check assertion after the test
   */
  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  /**
   * Check that we're able to fetch user data
   */
  it('Fetch user', function () {
      // setup tests objects
      var userId = 'idTestUser';
      var email = 'testuser@stractsim.com';

      var testUser = apiBuilder.getUserBuilder().withId(userId).withEmail(email).build();

      // providing request
      // add test user on Http backend
      stractBackend.setDefaultUser(testUser);

      // setup backend
      stractBackend.setup();

      // fetch user
      factory.fetchUser(true);

      // expecting GETs
      httpBackend.expectGET('/api/user');

      // flush command
      httpBackend.flush();

      // now, check user
      var user = factory.getUser();

      // check id and email
      expect(user.id).toEqual(userId);
      expect(user.email).toEqual(email);
    }
  );

  /**
   * Check that we're able to fetch user data by id
   */
  it('Fetch user by id', function () {
      // setup tests objects
      var userId = 'newIdTestUser';
      var email = 'testuser@stractsim.com';

      var testUser = apiBuilder.getUserBuilder().withId(userId).withEmail(email).build();

      // providing request
      // add test user on Http backend
      stractBackend.addUserId(testUser);

      // setup backend
      stractBackend.setup();

      // fetch user
      factory.fetchUserId(userId);

      // expecting GETs
      httpBackend.expectGET('/api/user/' + userId);

      // flush command
      httpBackend.flush();

      // now, check user
      var user = factory.getUserFromId(userId);

      // check id and email
      expect(user.id).toEqual(userId);
      expect(user.email).toEqual(email);
    }
  );

  /**
   * Check that we're able to fetch user data by email
   */
  it('Fetch user by email', function () {
      // setup tests objects
      var userId = 'testUser';
      var email = 'newuseremail@stractsim.com';

      var testUser = apiBuilder.getUserBuilder().withId(userId).withEmail(email).build();

      // providing request
      // add test user on Http backend
      stractBackend.addUserEmail(testUser);

      // setup backend
      stractBackend.setup();

      // fetch user
      factory.fetchUserEmail(email);

      // expecting GETs
      httpBackend.expectGET('/api/user/find?email=' + email);

      // flush command
      httpBackend.flush();

      // now, check user
      var user = factory.getUserFromEmail(email);

      // check id and email
      expect(user.id).toEqual(userId);
      expect(user.email).toEqual(email);
    }
  );

  /**
   * Check that we're able to set attributes into profile
   */
  it('Set password', function () {
      // setup
      var testPassword = 'newTestPassword';

      // setup backend
      stractBackend.setup();
      stractBackend.setPassword(testPassword);

      // fetch profile
      factory.setPassword(testPassword);

      // expecting a POST
      httpBackend.expectPOST('/api/user/password');

      // flush command
      httpBackend.flush();
    }
  );

});
