/**
 * Contains integration tests.
 * 
 * @module Test_integration_
 */

class IntegrationTests_ {
  /**
   * Runs all integration tests and logs the results to the console.
   */
  static runAllIntegrationTests() {
    let tests = [
      IntegrationTests_.test_getAllianceHistory_returnsNonEmptyArrayOnValidParameters_,
      IntegrationTests_.test_getAllianceFromCollection_returnsFleetWithUsersOnValidParameters_,
      IntegrationTests_.test_getAlliancesFromCollection_returnsCollectionWithoutUsersOnValidParameters_,
      IntegrationTests_.test_getCollection_returnsCollectionOnValidParameters_,
      IntegrationTests_.test_getCollections_returnsNonEmptyArrayOnValidParameters_,
      IntegrationTests_.test_getTop100UsersFromCollection_returnsCollectionWithoutAlliancesAndWith100UsersOnValidParameters_,
      IntegrationTests_.test_getUserHistory_returnsNonEmptyArrayOnValidParameters_,
      IntegrationTests_.test_getUserFromCollection_returnsUserWithFleetOnValidParameters_,
      IntegrationTests_.test_getUsersFromCollection_returnsCollectionWithoutAlliancesOnValidParameters_,
    ];

    Tests_.runTests_(tests);
  }

  static test_getAllianceHistory_returnsNonEmptyArrayOnValidParameters_() {
    const allianceId = 21;  // Wolfpack
    const fromDate = PSS_START_DATE;
    const toDate = newDate_(2020, 0, 1);
    const expectedType = AllianceHistoryResponse;

    let allianceHistoryResponse = getAllianceHistory(allianceId, fromDate, toDate);

    Tests_.assert_(allianceHistoryResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + allianceHistoryResponse.constructor.name);
    Tests_.assert_(allianceHistoryResponse.statusCode >= 200 && allianceHistoryResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + allianceHistoryResponse.statusCode);
    Tests_.assert_(Array.isArray(allianceHistoryResponse.allianceHistories), "Return value is of type array, actual type: " + typeof(allianceHistoryResponse.allianceHistories));
    Tests_.assert_(allianceHistoryResponse.allianceHistories.length > 0, "Return value is non-empty array, actual length: " + allianceHistoryResponse.allianceHistories.length);
  }

  static test_getAllianceFromCollection_returnsFleetWithUsersOnValidParameters_() {
    const allianceId = 21;  // Wolfpack
    const collectionId = 23;
    const expectedType = CollectionAllianceResponse;

    let allianceHistoryResponse = getAllianceFromCollection(collectionId, allianceId);

    Tests_.assert_(allianceHistoryResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + allianceHistoryResponse.constructor.name);
    Tests_.assert_(allianceHistoryResponse.statusCode >= 200 && allianceHistoryResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + allianceHistoryResponse.statusCode);
    Tests_.assert_(allianceHistoryResponse.allianceHistory.collection, "Response contains Metadata, actual value: " + allianceHistoryResponse.allianceHistory.collection);
    Tests_.assert_(allianceHistoryResponse.allianceHistory.alliance, "Response contains Alliance, actual value: " + allianceHistoryResponse.allianceHistory.alliance);
    Tests_.assert_(allianceHistoryResponse.allianceHistory.users.length > 0, "Response contains Users, actually contains: " + allianceHistoryResponse.allianceHistory.users.length);
  }

  static test_getAlliancesFromCollection_returnsCollectionWithoutUsersOnValidParameters_() {
    const collectionId = 23;
    const expectedType = CollectionAlliancesResponse;

    let collectionResponse = getAlliancesFromCollection(collectionId);

    Tests_.assert_(collectionResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + collectionResponse.constructor.name);
    Tests_.assert_(collectionResponse.statusCode >= 200 && collectionResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + collectionResponse.statusCode);
    Tests_.assert_(collectionResponse.metadata, "Response contains Metadata, actual value: " + collectionResponse.metadata);
    Tests_.assert_(collectionResponse.alliances.length > 0, "Response contains non-empty array of Alliances, actual length: " + collectionResponse.alliances.length);
  }

  static test_getCollection_returnsCollectionOnValidParameters_() {
    const collectionId = 23;
    const expectedType = CollectionResponse;

    let collectionResponse = getCollection(collectionId);

    Tests_.assert_(collectionResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + collectionResponse.constructor.name);
    Tests_.assert_(collectionResponse.statusCode >= 200 && collectionResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + collectionResponse.statusCode);
    Tests_.assert_(collectionResponse.collection, "Response contains Collection, actual value: " + collectionResponse.collection);
  }

  static test_getCollections_returnsNonEmptyArrayOnValidParameters_() {
    const fromDate = PSS_START_DATE;
    const toDate = newDate_(2020, 0, 1);
    const expectedType = CollectionMetadatasResponse;

    let collectionMetadatasResponse = getCollections(fromDate, toDate);

    Tests_.assert_(collectionMetadatasResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + collectionMetadatasResponse.constructor.name);
    Tests_.assert_(collectionMetadatasResponse.statusCode >= 200 && collectionMetadatasResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + collectionMetadatasResponse.statusCode);
    Tests_.assert_(Array.isArray(collectionMetadatasResponse.metadatas), "Return value is of type array, actual type: " + typeof(collectionMetadatasResponse.metadatas));
    Tests_.assert_(collectionMetadatasResponse.metadatas.length > 0, "Return value is non-empty array, actual length: " + collectionMetadatasResponse.metadatas.length);
  }

  static test_getTop100UsersFromCollection_returnsCollectionWithoutAlliancesAndWith100UsersOnValidParameters_() {
    const collectionId = 23;
    const expectedType = CollectionUsersResponse;

    let collectionResponse = getTop100UsersFromCollection(collectionId);

    Tests_.assert_(collectionResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + collectionResponse.constructor.name);
    Tests_.assert_(collectionResponse.statusCode >= 200 && collectionResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + collectionResponse.statusCode);
    Tests_.assert_(collectionResponse.metadata, "Response contains Metadata, actual value: " + collectionResponse.metadata);
    Tests_.assert_strictly_equal_(collectionResponse.users.length, 100, "Response contains 100 users, actually contains: " + collectionResponse.users.length);
  }

  static test_getUserHistory_returnsNonEmptyArrayOnValidParameters_() {
    const userId = 4510693;  // The worst.
    const fromDate = PSS_START_DATE;
    const toDate = newDate_(2020, 0, 1);
    const expectedType = UserHistoryResponse;

    let userHistoryResponse = getUserHistory(userId, fromDate, toDate);

    Tests_.assert_(userHistoryResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + userHistoryResponse.constructor.name);
    Tests_.assert_(userHistoryResponse.statusCode >= 200 && userHistoryResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + userHistoryResponse.statusCode);
    Tests_.assert_(Array.isArray(userHistoryResponse.userHistories), "Return value is of type array, actual type: " + typeof(userHistoryResponse.userHistories));
    Tests_.assert_(userHistoryResponse.userHistories.length > 0, "Return value is non-empty array, actual length: " + userHistoryResponse.userHistories.length);
  }

  static test_getUserFromCollection_returnsUserWithFleetOnValidParameters_() {
    const userId = 4510693;  // The worst.
    const collectionId = 23;
    const expectedType = CollectionUserResponse;

    let userHistoryResponse = getUserFromCollection(collectionId, userId);

    Tests_.assert_(userHistoryResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + userHistoryResponse.constructor.name);
    Tests_.assert_(userHistoryResponse.statusCode >= 200 && userHistoryResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + userHistoryResponse.statusCode);
    Tests_.assert_(userHistoryResponse.userHistory.collection, "Response contains Collection, actual value: " + userHistoryResponse.userHistory.collection);
    Tests_.assert_(userHistoryResponse.userHistory.alliance, "Response contains Alliance, actual value: " + userHistoryResponse.userHistory.alliance);
    Tests_.assert_(userHistoryResponse.userHistory.user, "Response contains User, actually contains: " + userHistoryResponse.userHistory.user);
  }

  static test_getUsersFromCollection_returnsCollectionWithoutAlliancesOnValidParameters_() {
    const collectionId = 23;
    const expectedType = CollectionUsersResponse;

    let collectionResponse = getUsersFromCollection(collectionId);

    Tests_.assert_(collectionResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + collectionResponse.constructor.name);
    Tests_.assert_(collectionResponse.statusCode >= 200 && collectionResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + collectionResponse.statusCode);
    Tests_.assert_(collectionResponse.metadata, "Response contains Metadata, actual value: " + collectionResponse.metadata);
    Tests_.assert_(collectionResponse.users.length > 0, "Response contains non-empty array of Users, actual length: " + collectionResponse.users.length);
  }
}
