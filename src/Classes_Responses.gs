/**
 * This module contains classes wrapping responses returned by the PSS Fleet Data API.
 *
 * @module Classes_Responses
 */

/**
 * Base class for responses returned by the PSS Fleet Data API.
 */
class ApiResponse_ {
  /**
   * constructor - Creates an instance of {@link module:Classes_Responses~ApiResponse_|ApiResponse_} based on the provided **HTTPResponse**.
   * 
   * @param {HTTPResponse} fetchedResponse - The original response from the PSS Fleet Data API.
   */
  constructor(fetchedResponse) {
    /**
     * statusCode - The HTTP status code of the response.
     * @type {integer}
     * @public
     */
    this.statusCode = fetchedResponse.getResponseCode();

    /**
     * responseJson - The object or array of objects parsed from the JSON in the response, if the {@link module:Classes_Responses~ApiResponse_#statusCode|statusCode} is in the **2xx** range. Else, **null**.
     * @type {(object|object[])}
     * @public
     */
    this.responseJson = null;
    if (this.statusCode >= 200 && this.statusCode < 300) {
      this.responseJson = JSON.parse(fetchedResponse.getContentText());
    }
  }
}

/**
 * Represents an API response from the `/allianceHistory/{allianceId}` endpoint.
 * 
 * @extends module:Classes_Responses~ApiResponse_
 */
class AllianceHistoryResponse extends ApiResponse_ {
  /**
   * constructor - Creates an instance of {@link module:Classes_Responses~AllianceHistoryResponse|AllianceHistoryResponse} based on the provided **HTTPResponse**.
   * 
   * @param {HTTPResponse} fetchedResponse - The original response from the PSS Fleet Data API.
   */
  constructor(fetchedResponse) {
    super(fetchedResponse);

    /**
     * allianceHistories - An array of {@link module:Classes_API~PssAllianceHistory|PssAllianceHistory} objects contained in the response, if the {@link module:Classes_Responses~ApiResponse_#responseJson|responseJson} is not **null**. Else, an empty array.
     * @type {PssAllianceHistory[]}
     * @public
     */
    this.allianceHistories = null;
    if (this.responseJson !== null) {
      this.allianceHistories = this.responseJson.map(json => PssAllianceHistory.fromJson(json));
    }
  }
}

/**
 * Represents an API response from the `/collections` endpoint.
 * 
 * @extends module:Classes_Responses~ApiResponse_
 */
class CollectionMetadatasResponse extends ApiResponse_ {
  /**
   * constructor - Creates an instance of {@link module:Classes_Responses~CollectionMetadatasResponse|CollectionMetadatasResponse} based on the provided **HTTPResponse**.
   * 
   * @param {HTTPResponse} fetchedResponse - The original response from the PSS Fleet Data API.
   */
  constructor(fetchedResponse) {
    super(fetchedResponse);

    /**
     * metadatas - An array of {@link module:Classes_API~CollectionMetadata|CollectionMetadata} objects contained in the response, if the {@link module:Classes_Responses~ApiResponse_#responseJson|responseJson} is not **null**. Else, **null**.
     * @type {CollectionMetadata[]}
     * @public
     */
    this.metadatas = null;
    if (this.responseJson !== null) {
      this.metadatas = this.responseJson.map(rawMetadata => new CollectionMetadata(rawMetadata));
    }
  }
}

/**
 * Represents an API response from the `/collections/{collectionId}` endpoint.
 * 
 * @extends module:Classes_Responses~ApiResponse_
 */
class CollectionResponse extends ApiResponse_ {
  /**
   * constructor - Creates an instance of {@link module:Classes_Responses~CollectionResponse|CollectionResponse} based on the provided **HTTPResponse**.
   * 
   * @param {HTTPResponse} fetchedResponse - The original response from the PSS Fleet Data API.
   */
  constructor(fetchedResponse) {
    super(fetchedResponse);

    /**
     * collection - The {@link module:Classes_API~Collection|Collection} object contained in the response, if the {@link module:Classes_Responses~ApiResponse_#responseJson|responseJson} is not **null**. Else, **null**.
     * @type {Collection}
     * @public
     */
    this.collection = null;
    if (this.responseJson !== null) {
      this.collection = Collection.fromJson(this.responseJson);
    }
  }
}

/**
 * Represents an API response from the `/collections/{collectionId}/alliances` endpoint.
 * 
 * @extends module:Classes_Responses~ApiResponse_
 */
class CollectionAlliancesResponse extends ApiResponse_ {
  /**
   * constructor - Creates an instance of {@link module:Classes_Responses~CollectionAlliancesResponse|CollectionAlliancesResponse} based on the provided **HTTPResponse**.
   * 
   * @param {HTTPResponse} fetchedResponse - The original response from the PSS Fleet Data API.
   */
  constructor(fetchedResponse) {
    super(fetchedResponse);

    /**
     * collection - The {@link module:Classes_API~CollectionMetadata|CollectionMetadata} object contained in the response, if the {@link module:Classes_Responses~ApiResponse_#responseJson|responseJson} is not **null**. Else, **null**.
     * @type {CollectionMetadata}
     * @public
     */
    this.metadata = null;
    
    /**
     * alliances - An array of `PssAlliance` objects contained in the response, if the {@link module:Classes_Responses~ApiResponse_#responseJson|responseJson} is not **null**. Else, an empty array.
     * @type {PssAlliance[]}
     * @public
     */
    this.alliances = null;
    if (this.responseJson !== null) {
      this.metadata = new CollectionMetadata(this.responseJson["meta"]);
      this.alliances = (this.responseJson["fleets"] || []).map(rawAlliance => new PssAlliance(rawAlliance));
    }
  }
}

/**
 * Represents an API response from the `/collections/{collectionId}/alliances/{allianceId}` endpoint.
 * 
 * @extends module:Classes_Responses~ApiResponse_
 */
class CollectionAllianceResponse extends ApiResponse_ {
  /**
   * constructor - Creates an instance of {@link module:Classes_Responses~CollectionAllianceResponse|CollectionAllianceResponse} based on the provided **HTTPResponse**.
   * 
   * @param {HTTPResponse} fetchedResponse - The original response from the PSS Fleet Data API.
   */
  constructor(fetchedResponse) {
    super(fetchedResponse);

    /**
     * allianceHistory - The {@link module:Classes_API~PssAllianceHistory|PssAllianceHistory} object contained in the response, if the {@link module:Classes_Responses~ApiResponse_#responseJson|responseJson} is not **null**. Else, **null**.
     * @type {PssAllianceHistory}
     * @public
     */
    this.allianceHistory = null;
    if (this.responseJson !== null) {
      this.allianceHistory = PssAllianceHistory.fromJson(this.responseJson);
    }
  }
}

/**
 * Represents an API response from the `/collections/{collectionId}/users` endpoint.
 * 
 * @extends module:Classes_Responses~ApiResponse_
 */
class CollectionUsersResponse extends ApiResponse_ {
  /**
   * constructor - Creates an instance of {@link module:Classes_Responses~CollectionUsersResponse|CollectionUsersResponse} based on the provided **HTTPResponse**.
   * 
   * @param {HTTPResponse} fetchedResponse - The original response from the PSS Fleet Data API.
   */
  constructor(fetchedResponse) {
    super(fetchedResponse);

    /**
     * collection - The {@link module:Classes_API~CollectionMetadata|CollectionMetadata} object contained in the response, if the {@link module:Classes_Responses~ApiResponse_#responseJson|responseJson} is not **null**. Else, **null**.
     * @type {CollectionMetadata}
     * @public
     */
    this.metadata = null;

    /**
     * users - An array of `PssUser` objects contained in the response, if the {@link module:Classes_Responses~ApiResponse_#responseJson|responseJson} is not **null**. Else, an empty array.
     * @type {PssUser[]}
     * @public
     */
    this.users = null;
    if (this.responseJson !== null) {
      this.metadata = new CollectionMetadata(this.responseJson["meta"]);
      this.users = this.responseJson["users"].map(rawUser => new PssUser(rawUser));
    }
  }
}

/**
 * Represents an API response from the `/collections/{collectionId}/users/{userId}` endpoint.
 * 
 * @extends module:Classes_Responses~ApiResponse_
 */
class CollectionUserResponse extends ApiResponse_ {
  /**
   * constructor - Creates an instance of {@link module:Classes_Responses~CollectionUserResponse|CollectionUserResponse} based on the provided **HTTPResponse**.
   * 
   * @param {HTTPResponse} fetchedResponse - The original response from the PSS Fleet Data API.
   */
  constructor(fetchedResponse) {
    super(fetchedResponse);

    /**
     * userHistory - The {@link module:Classes_API~PssUserHistory|PssUserHistory} object contained in the response, if the {@link module:Classes_Responses~ApiResponse_#responseJson|responseJson} is not **null**. Else, **null**.
     * @type {PssUserHistory}
     * @public
     */
    this.userHistory = null;
    if (this.responseJson !== null) {
      this.userHistory = PssUserHistory.fromJson(this.responseJson);
    }
  }
}

/**
 * Represents an API response from the `/userHistory/{userId}` endpoint.
 * 
 * @extends module:Classes_Responses~ApiResponse_
 */
class UserHistoryResponse extends ApiResponse_ {
  /**
   * constructor - Creates an instance of {@link module:Classes_Responses~UserHistoryResponse|UserHistoryResponse} based on the provided **HTTPResponse**.
   * 
   * @param {HTTPResponse} fetchedResponse - The original response from the PSS Fleet Data API.
   */
  constructor(fetchedResponse) {
    super(fetchedResponse);

    /**
     * userHistories - An array of {@link module:Classes_API~PssUserHistory|PssUserHistory} objects contained in the response, if the {@link module:Classes_Responses~ApiResponse_#responseJson|responseJson} is not **null**. Else, an empty array.
     * @type {PssUserHistory[]}
     * @public
     */
    this.userHistories = null;
    if (this.responseJson !== null) {
      this.userHistories = this.responseJson.map(json => PssUserHistory.fromJson(json));
    }
  }
}
