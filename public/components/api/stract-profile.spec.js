'use strict';

/**
 * Test of the StractProfile
 */
describe('StractProfile', function () {

  /**
   * Profile Factory for the test
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
   * stract backend
   */
  var stractBackend;

  /**
   *  setup module
   */
  beforeEach(module('stract'));

  /**
   * Inject factory and http backend
   */
  beforeEach(inject(function (stractProfile, stractAPIBuilder, stractHttpBackend) {
    factory = stractProfile;
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
   * Check that we're able to fetch profile
   */
  it('Fetch profile', function () {
    // setup tests objects
    var profileId = 'idDefaultUser';
    var email = 'testUser@stractsim.com';
    var firstName = 'FirstName';
    var lastName = 'LastName';

    var defaultProfile = apiBuilder.getProfileBuilder().withId(profileId).withEmail(email).withFirstName(firstName).withLastName(lastName).build();

    // providing request
    // add defaultProfile on Http backend
    stractBackend.addDefaultProfile(defaultProfile);

    // setup backend
    stractBackend.setup();

    // fetch profile
    factory.fetchProfile();

    // expecting GETs
    httpBackend.expectGET('/api/profile');
    httpBackend.expectGET('/api/profile/prefs');

    // flush command
    httpBackend.flush();

    // now, check profile
    var profile = factory.getProfile();

    // check id, email, firstName and lastName in profile attributes
    expect(profile.id).toEqual(profileId);
    expect(profile.attributes.email).toEqual(email);
    expect(profile.attributes.firstName).toEqual(firstName);
    expect(profile.attributes.lastName).toEqual(lastName);
    }
  );

  /**
   * Check that we're able to set attributes into profile
   */
  it('Set attributes', function () {
    // setup tests object
    var testAttributes = {lastName: '<none>', email: 'newTestUser@stractsim.com'};

    // setup backend
    stractBackend.setup();
    stractBackend.setAttributes(testAttributes);

    // fetch profile
    factory.setAttributes(testAttributes);

    // expecting a POST
    httpBackend.expectPOST('/api/profile');

    // flush command
    httpBackend.flush();

    // now, check profile
    var profile = factory.getProfile();

    // check profile new attributes
    expect(profile.attributes).toEqual(testAttributes);
    }
  );
});
