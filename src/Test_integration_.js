/**
 * @module Test_integration_
 * 
 * Contains integration tests.
 */

/**
 * Runs all integration tests and logs the results to the console.
 */
function runAllIntegrationTests() {
  tests = [
    test_getAllianceHistory_returnsNonEmptyArrayOnValidParameters_,
    test_getAllianceFromCollection_returnsFleetWithUsersOnValidParameters_,
    test_getAlliancesFromCollection_returnsCollectionWithoutUsersOnValidParameters_,
    test_getCollection_returnsCollectionOnValidParameters_,
    test_getCollections_returnsNonEmptyArrayOnValidParameters_,
    test_getTop100UsersFromCollection_returnsCollectionWithoutAlliancesAndWith100UsersOnValidParameters_,
    test_getUserHistory_returnsNonEmptyArrayOnValidParameters_,
    test_getUserFromCollection_returnsUserWithFleetOnValidParameters_,
    test_getUsersFromCollection_returnsCollectionWithoutAlliancesOnValidParameters_,
  ];

  runTests_(tests);
}

function test_getAllianceHistory_returnsNonEmptyArrayOnValidParameters_() {
  const allianceId = 21;  // Wolfpack
  const fromDate = PSS_START_DATE;
  const toDate = newDate_(2020, 0, 1);
  const expectedType = AllianceHistoryResponse;

  let allianceHistoryResponse = Client.getAllianceHistory(allianceId, fromDate, toDate);

  assert_(allianceHistoryResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + allianceHistoryResponse.constructor.name);
  assert_(allianceHistoryResponse.statusCode >= 200 && allianceHistoryResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + allianceHistoryResponse.statusCode);
  assert_(Array.isArray(allianceHistoryResponse.allianceHistories), "Return value is of type array, actual type: " + typeof(allianceHistoryResponse.allianceHistories));
  assert_(allianceHistoryResponse.allianceHistories.length > 0, "Return value is non-empty array, actual length: " + allianceHistoryResponse.allianceHistories.length);
}

function test_getAllianceFromCollection_returnsFleetWithUsersOnValidParameters_() {
  const allianceId = 21;  // Wolfpack
  const collectionId = 23;
  const expectedType = CollectionAllianceResponse;

  let allianceHistoryResponse = Client.getAllianceFromCollection(collectionId, allianceId);

  assert_(allianceHistoryResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + allianceHistoryResponse.constructor.name);
  assert_(allianceHistoryResponse.statusCode >= 200 && allianceHistoryResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + allianceHistoryResponse.statusCode);
  assert_(allianceHistoryResponse.allianceHistory.collection, "Response contains Metadata, actual value: " + allianceHistoryResponse.allianceHistory.collection);
  assert_(allianceHistoryResponse.allianceHistory.alliance, "Response contains Alliance, actual value: " + allianceHistoryResponse.allianceHistory.alliance);
  assert_(allianceHistoryResponse.allianceHistory.users.length > 0, "Response contains Users, actually contains: " + allianceHistoryResponse.allianceHistory.users.length);
}

function test_getAlliancesFromCollection_returnsCollectionWithoutUsersOnValidParameters_() {
  const collectionId = 23;
  const expectedType = CollectionAlliancesResponse;

  let collectionResponse = Client.getAlliancesFromCollection(collectionId);

  assert_(collectionResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + collectionResponse.constructor.name);
  assert_(collectionResponse.statusCode >= 200 && collectionResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + collectionResponse.statusCode);
  assert_(collectionResponse.metadata, "Response contains Metadata, actual value: " + collectionResponse.metadata);
  assert_(collectionResponse.alliances.length > 0, "Response contains non-empty array of Alliances, actual length: " + collectionResponse.alliances.length);
}

function test_getCollection_returnsCollectionOnValidParameters_() {
  const collectionId = 23;
  const expectedType = CollectionResponse;

  let collectionResponse = Client.getCollection(collectionId);

  assert_(collectionResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + collectionResponse.constructor.name);
  assert_(collectionResponse.statusCode >= 200 && collectionResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + collectionResponse.statusCode);
  assert_(collectionResponse.collection, "Response contains Collection, actual value: " + collectionResponse.collection);
}

function test_getCollections_returnsNonEmptyArrayOnValidParameters_() {
  const fromDate = PSS_START_DATE;
  const toDate = newDate_(2020, 0, 1);
  const expectedType = CollectionMetadatasResponse;

  let collectionMetadatasResponse = Client.getCollections(fromDate, toDate);

  assert_(collectionMetadatasResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + collectionMetadatasResponse.constructor.name);
  assert_(collectionMetadatasResponse.statusCode >= 200 && collectionMetadatasResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + collectionMetadatasResponse.statusCode);
  assert_(Array.isArray(collectionMetadatasResponse.metadatas), "Return value is of type array, actual type: " + typeof(collectionMetadatasResponse.metadatas));
  assert_(collectionMetadatasResponse.metadatas.length > 0, "Return value is non-empty array, actual length: " + collectionMetadatasResponse.metadatas.length);
}

function test_getTop100UsersFromCollection_returnsCollectionWithoutAlliancesAndWith100UsersOnValidParameters_() {
  const collectionId = 23;
  const expectedType = CollectionUsersResponse;

  let collectionResponse = Client.getTop100UsersFromCollection(collectionId);

  assert_(collectionResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + collectionResponse.constructor.name);
  assert_(collectionResponse.statusCode >= 200 && collectionResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + collectionResponse.statusCode);
  assert_(collectionResponse.metadata, "Response contains Metadata, actual value: " + collectionResponse.metadata);
  assert_strictly_equal_(collectionResponse.users.length, 100, "Response contains 100 users, actually contains: " + collectionResponse.users.length);
}

function test_getUserHistory_returnsNonEmptyArrayOnValidParameters_() {
  const userId = 4510693;  // The worst.
  const fromDate = PSS_START_DATE;
  const toDate = newDate_(2020, 0, 1);
  const expectedType = UserHistoryResponse;

  let userHistoryResponse = Client.getUserHistory(userId, fromDate, toDate);

  assert_(userHistoryResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + userHistoryResponse.constructor.name);
  assert_(userHistoryResponse.statusCode >= 200 && userHistoryResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + userHistoryResponse.statusCode);
  assert_(Array.isArray(userHistoryResponse.userHistories), "Return value is of type array, actual type: " + typeof(userHistoryResponse.userHistories));
  assert_(userHistoryResponse.userHistories.length > 0, "Return value is non-empty array, actual length: " + userHistoryResponse.userHistories.length);
}

function test_getUserFromCollection_returnsUserWithFleetOnValidParameters_() {
  const userId = 4510693;  // The worst.
  const collectionId = 23;
  const expectedType = CollectionUserResponse;

  let userHistoryResponse = Client.getUserFromCollection(collectionId, userId);

  assert_(userHistoryResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + userHistoryResponse.constructor.name);
  assert_(userHistoryResponse.statusCode >= 200 && userHistoryResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + userHistoryResponse.statusCode);
  assert_(userHistoryResponse.userHistory.collection, "Response contains Collection, actual value: " + userHistoryResponse.userHistory.collection);
  assert_(userHistoryResponse.userHistory.alliance, "Response contains Alliance, actual value: " + userHistoryResponse.userHistory.alliance);
  assert_(userHistoryResponse.userHistory.user, "Response contains User, actually contains: " + userHistoryResponse.userHistory.user);
}

function test_getUsersFromCollection_returnsCollectionWithoutAlliancesOnValidParameters_() {
  const collectionId = 23;
  const expectedType = CollectionUsersResponse;

  let collectionResponse = Client.getUsersFromCollection(collectionId);

  assert_(collectionResponse instanceof expectedType, "Response object is of type '" + expectedType.name + "', actual type: " + collectionResponse.constructor.name);
  assert_(collectionResponse.statusCode >= 200 && collectionResponse.statusCode < 300, "Statuscode is 2xx, actual output: " + collectionResponse.statusCode);
  assert_(collectionResponse.metadata, "Response contains Metadata, actual value: " + collectionResponse.metadata);
  assert_(collectionResponse.users.length > 0, "Response contains non-empty array of Users, actual length: " + collectionResponse.users.length);
}
