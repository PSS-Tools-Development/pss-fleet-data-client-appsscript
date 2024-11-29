/**
 * This module contains a stateless Pixel Starships Fleet Data API client.
 * 
 * @module Client
 */
 
 /**
 * A stateless Client for the Pixel Starships Fleet Data API.
 */
 class Client {
  /**
   * Retrieves the history of an {@link module:Classes_API~PssAlliance|PssAlliance} (fleet) from the given parameters.
   *
   * @param {integer} allianceId - The **AllianceId** of the {@link module:Classes_API~PssAlliance|PssAlliance} to retrieve the history for.
   * @param {Date} [fromDate] - The earliest date for which data shall be returned. Must be Jan 6th, 2016 or later. Must be earlier than parameter **toDate**, if that's specified.
   * @param {Date} [toDate] - The latest date for which data shall be returned. Must be Jan 6th, 2016 or later. Must be later than parameter **fromDate**, if that's specified.
   * @param {(Interval|string)} [interval] - Return the data from the specified time frame in hourly (value: **hour**), daily (value: **day**, last Collection of a day) or monthly (value: **month**, last Collection of a month, default) interval.
   * @param {boolean} [desc] - Return the results in descending order by timestamp.
   * @param {integer} [skip] - Skip this number of results from the result set.
   * @param {integer} [take] - Limit the number of results returned.
   * 
   * @returns {@link module:Classes_Responses~AllianceHistoryResponse|AllianceHistoryResponse} - The parsed and converted response from the PSS Fleet Data API.
   */
  static getAllianceHistory(allianceId, fromDate = undefined, toDate = undefined, interval = undefined, desc = undefined, skip = undefined, take = undefined) {
    let response = getFromApiUrl_("/allianceHistory/{allianceId}", allianceId, null, null, fromDate, toDate, interval, desc, skip, take);
    return new AllianceHistoryResponse(response);
  }

  /**
   * Retrieves the metadatas of {@link module:Classes_API~Collection|Collection}s meeting the given parameters.
   *
   * @param {Date} [fromDate] - The earliest date for which data shall be returned. Must be Jan 6th, 2016 or later. Must be earlier than parameter **toDate**, if that's specified.
   * @param {Date} [toDate] - The latest date for which data shall be returned. Must be Jan 6th, 2016 or later. Must be later than parameter **fromDate**, if that's specified.
   * @param {(Interval|string)} [interval] - Return the data from the specified time frame in hourly (value: **hour**), daily (value: **day**, last Collection of a day) or monthly (value: **month**, last Collection of a month, default) interval.
   * @param {boolean} [desc] - Return the results in descending order by timestamp.
   * @param {integer} [skip] - Skip this number of results from the result set.
   * @param {integer} [take] - Limit the number of results returned.
   * 
   * @returns {@link module:Classes_Responses~CollectionMetadatasResponse|CollectionMetadatasResponse} - The parsed and converted response from the PSS Fleet Data API.
   */
  static getCollections(fromDate, toDate, interval, desc, skip, take) {
    let response = getFromApiUrl_("/collections", null, null, null, fromDate, toDate, interval, desc, skip, take);
    return new CollectionMetadatasResponse(response);
  }

  /**
   * Retrieves the {@link module:Classes_API~Collection|Collection} with the given **collectionId**.
   *
   * @param {integer} collectionId - The **CollectionId** of the {@link module:Classes_API~Collection|Collection} to retrieve.
   * 
   * @returns {@link module:Classes_Responses~CollectionResponse|CollectionResponse} - The parsed and converted response from the PSS Fleet Data API.
   */
  static getCollection(collectionId) {
    let response = getFromApiUrl_("/collections/{collectionId}", null, collectionId, null);
    return new CollectionResponse(response);
  }

  /**
   * Retrieves the {@link module:Classes_API~PssAlliance|PssAlliance}s (fleets) from the {@link module:Classes_API~Collection|Collection} with the given **collectionId**.
   *
   * @param {integer} collectionId - The **CollectionId** of the {@link module:Classes_API~Collection|Collection} to retrieve the {@link module:Classes_API~PssAlliance|PssAlliance}s (fleets) from.
   * 
   * @returns {@link module:Classes_Responses~CollectionAlliancesResponse|CollectionAlliancesResponse} - The parsed and converted response from the PSS Fleet Data API.
   */
  static getAlliancesFromCollection(collectionId) {
    let response = getFromApiUrl_("/collections/{collectionId}/alliances", null, collectionId, null);
    return new CollectionAlliancesResponse(response);
  }

  /**
   * Retrieves the {@link module:Classes_API~PssAlliance|PssAlliance} (fleet) with the given **allianceId** from the {@link module:Classes_API~Collection|Collection} with the given **collectionId**, including its members.
   *
   * @param {integer} collectionId - The **CollectionId** of the {@link module:Classes_API~Collection|Collection} to retrieve the {@link module:Classes_API~PssAlliance|PssAlliance} (fleet) from.
   * @param {integer} allianceId - The **AllianceId** of the {@link module:Classes_API~PssAlliance|PssAlliance} (fleet) to retrieve.
   * 
   * @returns {@link module:Classes_Responses~CollectionAllianceResponse|CollectionAllianceResponse} - The parsed and converted response from the PSS Fleet Data API.
   */
  static getAllianceFromCollection(collectionId, allianceId) {
    let response = getFromApiUrl_("/collections/{collectionId}/alliances/{allianceId}", allianceId, collectionId, null);
    return new CollectionAllianceResponse(response);
  }

  /**
   * Retrieves the {@link module:Classes_API~PssUser|PssUser}s (players) from the {@link module:Classes_API~Collection|Collection} with the given **collectionId**.
   *
   * @param {integer} collectionId - The **CollectionId** of the {@link module:Classes_API~Collection|Collection} to retrieve the {@link module:Classes_API~PssUser|PssUser}s (players) from.
   * 
   * @returns {@link module:Classes_Responses~CollectionUsersResponse|CollectionUsersResponse} - The parsed and converted response from the PSS Fleet Data API.
   */
  static getTop100UsersFromCollection(collectionId) {
    let response = getFromApiUrl_("/collections/{collectionId}/top100Users", null, collectionId, null);
    return new CollectionUsersResponse(response);
  }

  /**
   * Retrieves the {@link module:Classes_API~PssUser|PssUser} (player) with the given **userId** from the {@link module:Classes_API~Collection|Collection} with the given **collectionId**, including its {@link module:Classes_API~PssAlliance|PssAlliance} (fleet), if applicable.
   *
   * @param {integer} collectionId - The **CollectionId** of the {@link module:Classes_API~Collection|Collection} to retrieve the {@link module:Classes_API~PssUser|PssUser} (player) from.
   * @param {integer} userId - The **Id** of the {@link module:Classes_API~PssUser|PssUser} (player) to retrieve.
   * 
   * @returns {@link module:Classes_Responses~CollectionUserResponse|CollectionUserResponse} - The parsed and converted response from the PSS Fleet Data API.
   */
  static getUserFromCollection(collectionId, userId) {
    let response = getFromApiUrl_("/collections/{collectionId}/users/{userId}", null, collectionId, userId);
    return new CollectionUserResponse(response);
  }

  /**
   * Retrieves the {@link module:Classes_API~PssUser|PssUser}s (players) from the {@link module:Classes_API~Collection|Collection} with the given **collectionId**.
   *
   * @param {integer} collectionId - The **CollectionId** of the {@link module:Classes_API~Collection|Collection} to retrieve the {@link module:Classes_API~PssUser|PssUser}s (players) from.
   * 
   * @returns {@link module:Classes_Responses~CollectionUsersResponse|CollectionUsersResponse} - The parsed and converted response from the PSS Fleet Data API.
   */
  static getUsersFromCollection(collectionId) {
    let response = getFromApiUrl_("/collections/{collectionId}/users", null, collectionId, null);
    return new CollectionUsersResponse(response);
  }

  /**
   * Retrieves the history of a {@link module:Classes_API~PssUser|PssUser} (player) from the given parameters.
   *
   * @param {integer} userId - The **Id** of the {@link module:Classes_API~PssUser|PssUser} to retrieve the history for.
   * @param {Date} [fromDate] - The earliest date for which data shall be returned. Must be Jan 6th, 2016 or later. Must be earlier than parameter **toDate**, if that's specified.
   * @param {Date} [toDate] - The latest date for which data shall be returned. Must be Jan 6th, 2016 or later. Must be later than parameter **fromDate**, if that's specified.
   * @param {(Interval|string)} [interval] - Return the data from the specified time frame in hourly (value: **hour**), daily (value: **day**, last Collection of a day) or monthly (value: **month**, last Collection of a month, default) interval.
   * @param {boolean} [desc] - Return the results in descending order by timestamp.
   * @param {integer} [skip] - Skip this number of results from the result set.
   * @param {integer} [take] - Limit the number of results returned.
   * 
   * @returns {@link module:Classes_Responses~UserHistoryResponse|UserHistoryResponse} - The parsed and converted response from the PSS Fleet Data API.
   */
  static getUserHistory(userId, fromDate, toDate, interval, desc, skip, take) {
    let response = getFromApiUrl_("/userHistory/{userId}", null, null, userId, fromDate, toDate, interval, desc, skip, take);
    return new UserHistoryResponse(response);
  }
}
