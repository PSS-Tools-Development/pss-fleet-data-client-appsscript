/**
 * This module contains classes wrapping objects returned by the PSS Fleet Data API.
 * 
 * @module Classes_API
 */

/**
 * Represents the metadata of a PSS Fleet Data {@link module:Classes_API~Collection|Collection}.
 */
class CollectionMetadata {
  /**
   * constructor - Creates an instance of {@link module:Classes_API~CollectionMetadata|CollectionMetadata} based on the given data.
   * 
   * @param {object} objMetadata - An object retrieved by parsing JSON data from the PSS Fleet Data API.
   * @param {string} objMetadata.timestamp - The timestamp of the **Date** at which the data was collected. In ISO-8601 format without the 'T' separator or timezone information. UTC timezone is assumed.
   * @param {float} objMetadata.duration - The time it took to collect the data.
   * @param {integer} objMetadata.fleet_count - The number of {@link module:Classes_API~PssAlliance|PssAlliance}s (fleets) included in this {@link module:Classes_API~Collection|Collection}.
   * @param {integer} objMetadata.user_count - The number of {@link module:Classes_API~PssUser|PssUser}s (players) included in this {@link module:Classes_API~Collection|Collection}.
   * @param {boolean} objMetadata.tourney_running - Determines, if a monthly Tournament was running when collecting this data.
   * @param {integer} objMetadata.data_version - The schema version used when collecting the data.
   * @param {integer} objMetadata.schema_version - The schema version that the PSS Fleet Data API server used when sending the data.
   * @param {integer} objMetadata.max_tournament_battle_attempts - The maximum number of daily battle attempts in the monthly Tournament.
   * @param {integer} objMetadata.collection_id - The ID of the {@link module:Classes_API~Collection|Collection}.
   */
  constructor(objMetadata) {
    /**
     * timestamp - The timestamp of the **Date** at which the data was collected. In ISO-8601 format without the 'T' separator or timezone information. UTC timezone is assumed.
     * @type {string}
     * @public
     */
    this.timestamp = objMetadata["timestamp"];

    /**
     * collectedAt - The **Date** at which the data was collected. UTC timezone.
     * @type {Date}
     * @public
     */
    this.collectedAt = new Date(this.timestamp);

    /**
     * duration - The time it took to collect the data.
     * @type {float}
     * @public
     */
    this.duration = objMetadata["duration"];

    /**
     * fleetCount - The number of {@link module:Classes_API~PssAlliance|PssAlliance}s (fleets) included in this {@link module:Classes_API~Collection|Collection}.
     * @type {integer}
     * @public
     */
    this.fleetCount = objMetadata["fleet_count"];

    /**
     * userCount - The number of {@link module:Classes_API~PssUser|PssUser}s (players) included in this {@link module:Classes_API~Collection|Collection}.
     * @type {integer}
     * @public
     */
    this.userCount = objMetadata["user_count"];

    /**
     * tournamentRunning - Determines, if a monthly Tournament was running when collecting this data.
     * @type {boolean}
     * @public
     */
    this.tournamentRunning = objMetadata["tourney_running"];

    /**
     * dataVersion - The schema version used when collecting the data.
     * @type {integer}
     * @public
     */
    this.dataVersion = objMetadata["data_version"];

    /**
     * schemaVersion - The schema version that the PSS Fleet Data API server used when sending the data.
     * @type {integer}
     * @public
     */
    this.schemaVersion = objMetadata["schema_version"];

    /**
     * maxTournamentBattleAttempts - The maximum number of daily battle attempts in the monthly Tournament.
     * @type {integer}
     * @public
     */
    this.maxTournamentBattleAttempts = objMetadata["max_tournament_battle_attempts"];

    /**
     * collectionId - The ID of this {@link module:Classes_API~Collection|Collection}.
     * @type {integer}
     * @public
     */
    this.collectionId = objMetadata["collection_id"];
  }
}

/**
 * Represents a PSS Fleet Data {@link module:Classes_API~Collection|Collection}. This is a snapshot of top 100 fleets and their members and top 100 players not in a fleet taken once an hour.
 */
class Collection {
  /**
   * constructor - Creates an instance of {@link module:Classes_API~Collection|Collection} based on the given data.
   * 
   * @param {CollectionMetadata} collectionMetadata - The metadata of the {@link module:Classes_API~Collection|Collection}.
   * @param {PssAlliance[]} alliances - The {@link module:Classes_API~PssAlliance|PssAlliance}s (fleets) recorded in this {@link module:Classes_API~Collection|Collection}. May be empty.
   * @param {PssUser[]} users - The {@link module:Classes_API~PssUser|PssUser}s (players) recorded in this {@link module:Classes_API~Collection|Collection}. May be empty.
   */
  constructor(collectionMetadata, alliances, users) {
    /**
     * metadata - The metadata of the {@link module:Classes_API~Collection|Collection}.
     * @type {CollectionMetadata}
     * @public
     */
    this.metadata = collectionMetadata;
    
    /**
     * alliances - The {@link module:Classes_API~PssAlliance|PssAlliance}s (fleets) recorded in this {@link module:Classes_API~Collection|Collection}. Might be empty.
     * @type {PssAlliance[]}
     * @public
     */
    this.alliances = alliances;

    /**
     * users - The {@link module:Classes_API~PssUser|PssUser}s (players) recorded in this {@link module:Classes_API~Collection|Collection}. Might be empty.
     * @type {PssUser[]}
     * @public
     */
    this.users = users;
  }

  /**
   * Creates an instance of {@link module:Classes_API~CollectionMetadata|CollectionMetadata} from an object parsed from the JSON returned by the PSS Fleet Data API.
   * 
   * @param {object} json - The metadata of the {@link module:Classes_API~Collection|Collection} as parsed from the response of the API.
   * @param {object} [json.meta] - The metadata of the {@link module:Classes_API~Collection|Collection}. This key is returned by the API for any of the `/collection...` endpoints instead of **collection**.
   * @param {object} [json.collection] - The metadata of the {@link module:Classes_API~Collection|Collection}. This key is returned by the API for the `/allianceHistory` & `/userHistory` endpoints instead of **meta**.
   * @param {Array[]} json.fleets - The {@link module:Classes_API~PssAlliance|PssAlliance}s (fleets) recorded in this {@link module:Classes_API~Collection|Collection}. May be empty. Defaults to an empty array, if not found in the provided JSON.
   * @param {Array[]} json.users - The {@link module:Classes_API~PssUser|PssUser}s (players) recorded in this {@link module:Classes_API~Collection|Collection}. May be empty. Defaults to an empty array, if not found in the provided JSON.
   * 
   * @returns {@link module:Classes_API~Collection|Collection} - An new instance of {@link module:Classes_API~Collection|Collection}.
   */
  static fromJson(json) {
    let metadata = new CollectionMetadata(json["meta"] || json["collection"]);
    let alliances = (json["fleets"] || []).map(rawAlliance => new PssAlliance(rawAlliance));
    let users = (json["users"] || []).map(rawUser => new PssUser(rawUser));

    return new Collection(metadata, alliances, users);
  }
}

/**
 * Represents a {@link module:Classes_API~PssAlliance|PssAlliance}s (fleets).
 */
class PssAlliance {
  /**
   * constructor - Creates an instance of {@link module:Classes_API~PssAlliance|PssAlliance} based on the given data.
   * 
   * @param {any[]} rawAlliance - An array representing an alliance (fleet) as returned by the PSS Fleet Data API.
   */
  constructor(rawAlliance) {
    /**
     * allianceId - The **AllianceId** of the {@link module:Classes_API~PssAlliance|Alliance}.
     * @type {integer}
     * @public
     */
    this.allianceId = rawAlliance[0];

    /**
     * allianceName - The **AllianceName** of the {@link module:Classes_API~PssAlliance|Alliance}.
     * @type {string}
     * @public
     */
    this.allianceName = rawAlliance[1];

    /**
     * score - The **Score** (sum of the number of stars obtained by each member) of the {@link module:Classes_API~PssAlliance|Alliance}.
     * @type {integer}
     * @public
     */
    this.score = rawAlliance[2];

    /**
     * divisionDesignId - The **DivisionDesignId** of the tournament division of the {@link module:Classes_API~PssAlliance|Alliance}.
     * @type {integer}
     * @public
     */
    this.divisionDesignId = rawAlliance[3];

    /**
     * trophy - The **Trophy** (sum of the trophies of each member) of the {@link module:Classes_API~PssAlliance|Alliance}.
     * @type {integer}
     * @public
     */
    this.trophy = rawAlliance[4];

    /**
     * championshipScore - The **ChampionshipScore** of the {@link module:Classes_API~PssAlliance|Alliance}.
     * @type {integer}
     * @public
     */
    this.championshipScore = rawAlliance[5];

    /**
     * numberOfMembers - The **NumberOfMembers** (total member count) of the {@link module:Classes_API~PssAlliance|Alliance}.
     * @type {integer}
     * @public
     */
    this.numberOfMembers = rawAlliance[6];

    /**
     * numberOfApprovedMembers - The **numberOfApprovedMembers** (unapproved member count) of the {@link module:Classes_API~PssAlliance|Alliance}.
     * @type {integer}
     * @public
     */
    this.numberOfApprovedMembers = rawAlliance[7];
  }
}

/**
 * Represents a PSS **User** (player).
 */
class PssUser {
  /**
   * constructor - Creates an instance of {@link module:Classes_API~PssUser|PssUser} based on the given data.
   * 
   * @param {any[]} rawUser - An array representing a user (player) as returned by the PSS Fleet Data API.
   */
  constructor(rawUser) {
    /**
     * id - The **Id** of the PSS **User**.
     * @type {integer}
     * @public
     */
    this.id = rawUser[0];
    
    /**
     * name - The **Name** of the PSS **User**.
     * @type {string}
     * @public
     */
    this.name = rawUser[1];
    
    /**
     * allianceId - The **AllianceId** of the PSS **User**. Might be **null**, if the user does not belong to an {@link module:Classes_API~PssAlliance|Alliance}.
     * @type {integer}
     * @public
     */
    this.allianceId = rawUser[2];
    
    /**
     * trophy - The **Trophy** (trophy count) of the {@link module:Classes_API~PssUser|PssUser}.
     * @type {integer}
     * @public
     */
    this.trophy = rawUser[3];
    
    /**
     * allianceScore - The **AllianceScore** (number of stars retrieved) of the {@link module:Classes_API~PssUser|PssUser}. Might be **null**, if the user does not belong to an {@link module:Classes_API~PssAlliance|Alliance}.
     * @type {integer}
     * @public
     */
    this.allianceScore = rawUser[4];
    
    /**
     * allianceMembership - The decoded **AllianceMembership** of the {@link module:Classes_API~PssUser|PssUser}. Might be **null**, if the user does not belong to an {@link module:Classes_API~PssAlliance|Alliance}.
     * @type {AllianceMembership}
     * @public
     */
    this.allianceMembership = decodeFleetRank_(rawUser[5]);
    
    /**
     * allianceJoinDate - The **AllianceJoinDate** of the {@link module:Classes_API~PssUser|PssUser}. Might be **null**, if the user does not belong to an {@link module:Classes_API~PssAlliance|Alliance}.
     * @type {Date}
     * @public
     */
    this.allianceJoinDate = decodeTimestamp_(rawUser[6]);
    
    /**
     * lastLoginDate - The **LastLoginDate** of the {@link module:Classes_API~PssUser|PssUser}.
     * @type {Date}
     * @public
     */
    this.lastLoginDate = decodeTimestamp_(rawUser[7]);
    
    /**
     * lastHeartBeatDate - The **LastHeartBeatDate** of the {@link module:Classes_API~PssUser|PssUser}.
     * @type {Date}
     * @public
     */
    this.lastHeartBeatDate = decodeTimestamp_(rawUser[8]);
    
    /**
     * crewDonated - The **CrewDonated** of the {@link module:Classes_API~PssUser|PssUser}.
     * @type {integer}
     * @public
     */
    this.crewDonated = rawUser[9];
    
    /**
     * crewReceived - The **CrewReceived** of the {@link module:Classes_API~PssUser|PssUser}.
     * @type {integer}
     * @public
     */
    this.crewReceived = rawUser[10];
    
    /**
     * pvpAttackWins - The **PVPAttackWins** of the {@link module:Classes_API~PssUser|PssUser}.
     * @type {integer}
     * @public
     */
    this.pvpAttackWins = rawUser[11];
    
    /**
     * pvpAttackLosses - The **PVPAttackLosses** of the {@link module:Classes_API~PssUser|PssUser}.
     * @type {integer}
     * @public
     */
    this.pvpAttackLosses = rawUser[12];
    
    /**
     * pvpAttackDraws - The **PVPAttackDraws** of the {@link module:Classes_API~PssUser|PssUser}.
     * @type {integer}
     * @public
     */
    this.pvpAttackDraws = rawUser[13];
    
    /**
     * pvpDefenceWins - The **PVPDefenceWins** of the {@link module:Classes_API~PssUser|PssUser}.
     * @type {integer}
     * @public
     */
    this.pvpDefenceWins = rawUser[14];
    
    /**
     * pvpDefenceLosses - The **PVPDefenceLosses** of the {@link module:Classes_API~PssUser|PssUser}.
     * @type {integer}
     * @public
     */
    this.pvpDefenceLosses = rawUser[15];
    
    /**
     * pvpDefenceDraws - The **PVPDefenceDraws** of the {@link module:Classes_API~PssUser|PssUser}.
     * @type {integer}
     * @public
     */
    this.pvpDefenceDraws = rawUser[16];
    
    /**
     * championshipScore - The **ChampionshipScore** of the {@link module:Classes_API~PssUser|PssUser}.
     * @type {integer}
     * @public
     */
    this.championshipScore = rawUser[17];
    
    /**
     * highestTrophy - The **HighestTrophy** of the {@link module:Classes_API~PssUser|PssUser}.
     * @type {integer}
     * @public
     */
    this.highestTrophy = rawUser[18];

    /**
     * tournamentBonusScore - The **TournamentBonusScore** (number of tournament battles done) of the {@link module:Classes_API~PssUser|PssUser}.
     * @type {integer}
     * @public
     */
    this.tournamentBonusScore = rawUser[19];
  }
}

/**
 * Represents a snapshot of a {@link module:Classes_API~PssAlliance|PssAlliance}s (fleets) including information on the {@link module:Classes_API~Collection|Collection} and the {@link module:Classes_API~PssAlliance|Alliance}'s members.
 */
class PssAllianceHistory {
  /**
   * constructor - Creates an instance of {@link module:Classes_API~PssAllianceHistory|PssAllianceHistory} based on the given data.
   * 
   * @param {CollectionMetadata} collectionMetadata - The metadata of the {@link module:Classes_API~Collection|Collection}.
   * @param {PssAlliance} alliance - The {@link module:Classes_API~PssAlliance|PssAlliance}s (fleets) recorded in this {@link module:Classes_API~PssAllianceHistory|PssAllianceHistory}.
   * @param {PssUser[]} users - The {@link module:Classes_API~PssUser|PssUser}s (players) belonging to the {@link module:Classes_API~PssAlliance|Alliance} recorded in this {@link module:Classes_API~PssAllianceHistory|PssAllianceHistory}. May be empty.
   */
  constructor(collectionMetadata, alliance, users) {
    /**
     * collection - The metadata of the {@link module:Classes_API~Collection|Collection} this {@link module:Classes_API~PssAllianceHistory|PssAllianceHistory} is part of.
     * @type {CollectionMetadata}
     * @public
     */
    this.collection = collectionMetadata;
    
    /**
     * alliance - The {@link module:Classes_API~PssAlliance|PssAlliance}s (fleets) recorded in this {@link module:Classes_API~PssAllianceHistory|PssAllianceHistory}.
     * @type {PssAlliance}
     * @public
     */
    this.alliance = alliance;

    /**
     * users - The members of the {@link module:Classes_API~PssAlliance|PssAlliance}s (fleets) recorded in this {@link module:Classes_API~PssAllianceHistory|PssAllianceHistory}.
     * @type {PssUser[]}
     * @public
     */
    this.users = users;
  }

  /**
   * Creates an instance of {@link module:Classes_API~PssAllianceHistory|PssAllianceHistory} from an object parsed from the JSON returned by the PSS Fleet Data API.
   * 
   * @param {object} json - An {@link module:Classes_API~PssAllianceHistory|PssAllianceHistory} as parsed from the response of the API.
   * @param {object} json.collection - The metadata of the {@link module:Classes_API~Collection|Collection}.
   * @param {Array} json.fleet - The {@link module:Classes_API~PssAlliance|PssAlliance}s (fleets) recorded in this {@link module:Classes_API~PssAllianceHistory|PssAllianceHistory}.
   * @param {Array[]} json.users - The {@link module:Classes_API~PssUser|PssUser}s (players) recorded in this {@link module:Classes_API~PssAllianceHistory|PssAllianceHistory}. May be empty. Defaults to an empty array, if not found in the provided JSON.
   * 
   * @returns {@link module:Classes_API~PssAllianceHistory|PssAllianceHistory} - An new instance of {@link module:Classes_API~PssAllianceHistory|PssAllianceHistory}.
   */
  static fromJson(json) {
    let collection = new CollectionMetadata(json["collection"]);
    let alliance = new PssAlliance(json["fleet"]);
    let users = (json["users"] || []).map(rawUser => new PssUser(rawUser));

    return new PssAllianceHistory(collection, alliance, users);
  }
}

/**
 * Represents a snapshot of a PSS {@link module:Classes_API~PssUser|PssUser} (player) including information on the {@link module:Classes_API~Collection|Collection} and the {@link module:Classes_API~PssUser|PssUser}'s {@link module:Classes_API~PssAlliance|Alliance}, if applicable.
 */
class PssUserHistory {
  /**
   * constructor - Creates an instance of {@link module:Classes_API~PssUserHistory|UserHistory} based on the given data.
   * 
   * @param {CollectionMetadata} collectionMetadata - The metadata of the {@link module:Classes_API~Collection|Collection}.
   * @param {PssUser} user - The {@link module:Classes_API~PssUser|PssUser} (player) recorded in this {@link module:Classes_API~PssUserHistory|UserHistory}.
   * @param {PssAlliance} alliance - The {@link module:Classes_API~PssAlliance|PssAlliance}s (fleets) of the {@link module:Classes_API~PssUser|PssUser} recorded in this {@link module:Classes_API~PssUserHistory|UserHistory}. May be **null**, if the {@link module:Classes_API~PssUser|PssUser} doesn't belong to an {@link module:Classes_API~PssAlliance|Alliance}.
   */
  constructor(collectionMetadata, user, alliance = null) {
    /**
     * collection - The metadata of the {@link module:Classes_API~Collection|Collection} this PSS {@link module:Classes_API~PssUserHistory|UserHistory} is part of.
     * @type {CollectionMetadata}
     * @public
     */
    this.collection = collectionMetadata;

    /**
     * user - The {@link module:Classes_API~PssUser|PssUser} (player) recorded in this {@link module:Classes_API~PssUserHistory|UserHistory}.
     * @type {PssUser}
     * @public
     */
    this.user = user;

    /**
     * alliance - The {@link module:Classes_API~PssAlliance|PssAlliance}s (fleets) of the {@link module:Classes_API~PssUser|PssUser} recorded in this {@link module:Classes_API~PssUserHistory|UserHistory}. Might be **null**, if the {@link module:Classes_API~PssUser|PssUser} doesn't belong to an {@link module:Classes_API~PssAlliance|Alliance}.
     * @type {PssAlliance}
     * @public
     */
    this.alliance = alliance;
  }

  /**
   * Creates an instance of {@link module:Classes_API~PssUserHistory|UserHistory} from an object parsed from the JSON returned by the PSS Fleet Data API.
   * 
   * @param {object} json - A {@link module:Classes_API~PssUserHistory|UserHistory} as parsed from the response of the API.
   * @param {object} json.collection - The metadata of the {@link module:Classes_API~Collection|Collection}.
   * @param {Array} json.user - The {@link module:Classes_API~PssUser|PssUser} (player) recorded in this {@link module:Classes_API~PssUserHistory|UserHistory}.
   * @param {Array} [json.fleet] - The {@link module:Classes_API~PssAlliance|PssAlliance}s (fleets) of the {@link module:Classes_API~PssUser|PssUser} recorded in this {@link module:Classes_API~PssUserHistory|UserHistory}. May be **null**, if the {@link module:Classes_API~PssUser|PssUser} doesn't belong to an {@link module:Classes_API~PssAlliance|Alliance}.
   * 
   * @returns {@link module:Classes_API~PssUserHistory|PssUserHistory} - An new instance of {@link module:Classes_API~PssUserHistory|PssUserHistory}.
   */
  static fromJson(json) {
    let collection = new CollectionMetadata(json["collection"]);
    let user = new PssUser(json["user"]);
    let alliance = null;
    if (json["fleet"]) {
      alliance = new PssAlliance(json["fleet"]);
    }

    return new PssUserHistory(collection, user, alliance);
  }
}
