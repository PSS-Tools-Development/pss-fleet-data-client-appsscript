/**
 * This module contains utility functions.
 * 
 * @module Helper_
 */

/**
 * Converts an integer as returned from the PSS Fleet Data API to an {@link module:Enums~AllianceMembership|AllianceMembership} enum value.
 *
 * @param {integer} fleetRank - The fleet rank value as returned by the PSS Fleet Data API.
 * 
 * @return {(AllianceMembership|null)} - The {@link module:Enums~AllianceMembership|AllianceMembership} enum value matching the input. Returns **null**, if the provided **fleetRank** doesn't match an enum value. 
 */
function decodeFleetRank_(fleetRank) {
  for (let key of Object.keys(AllianceMembership)) {
    let rank = AllianceMembership[key];
    if (rank.value == fleetRank) {
      return rank;
    }
  }

  return null;
}

/**
 * Converts an integer as returned from the PSS Fleet Data API to a **Date** object.
 *
 * @param {integer} [secondsSincePssStart] - The number of seconds that passed since Jan 6th, 2016.
 * 
 * @return {Date} - A **Date** object representing a specific point in time since PSS started, if **secondsSincePssStart** is truthy. Else, **null**.
 */
function decodeTimestamp_(secondsSincePssStart) {
  if (!secondsSincePssStart && secondsSincePssStart !== 0) {
    return null;
  }

  let result = new Date(PSS_START_DATE_MS + parseInt(secondsSincePssStart) * 1000);
  return result;
}

/**
 * Takes a **URL** and a dictionary of query parameters and turns them into a full URL.
 *
 * @param {string} url - The base URL to append the query parameters to.
 * @param {object} queryParameters - An object having the parameter names as keys and their values as values. The values will get converted to strings and url-encoded.
 * 
 * @return {string} - A full URL including query parameters.
 */
function assembleUrl_(url, queryParameters) {
  let params = [];
  for (let name in queryParameters) {
    params.push(name + "=" + encodeURIComponent(queryParameters[name]));
  }

  let paramsString = params.join("&");
  if (paramsString) {
    url = url + "?" + paramsString;
  }

  return url;
}

/**
 * Takes some query parameters and adds them to a dictionary, if they're defined.
 *
 * @param {Date} [fromDate] - The earliest date for which data shall be returned.
 * @param {Date} [toDate] - The latest date for which data shall be returned.
 * @param {(Interval|string)} [interval] - Return the data from the specified time frame in hourly (value: "hour"), daily (value: "day", last {@link module:Classes_API~Collection|Collection} of a day) or monthly (value: "month", last {@link module:Classes_API~Collection|Collection} of a month) interval.
 * @param {boolean} [desc] - Return the results in descending order by timestamp.
 * @param {integer} [skip] - Skip this number of results from the result set.
 * @param {integer} [take] - Limit the number of results returned.
 * 
 * @return {object} - An object containing the keys and values for each of the parameters provided. The object may have no keys, if no parameter was provided.
 */
function constructParamsObject_(fromDate, toDate, interval, desc, skip, take) {
  let parameters = {};
  if (fromDate) {
    parameters["fromDate"] = convertDateToParameter_(fromDate);
  }
  if (toDate) {
    parameters["toDate"] = convertDateToParameter_(toDate);
  }
  if (interval) {
    parameters["interval"] = convertIntervalToParameter_(interval);
  }
  if (desc === true || desc === false) {
    parameters["desc"] = desc;
  }
  if (skip || skip == 0) {
    parameters["skip"] = skip;
  }
  if (take) {
    parameters["take"] = take;
  }

  return parameters;
}

/**
 * Takes a **Date** and converts it to a string to be used as a parameter in a call to the PSS Fleet Data API.
 *
 * @param {(Date|string)} date - The date to get converted. 
 * 
 * @return {(string|null)} - A **Date** converted to an ISO-8601 string, if the input value is of type **Date**. The input, if the input is of type **string**. Else, **null**.
 */
function convertDateToParameter_(date) {
  if (typeof(date.getUTCFullYear) === "function") {
    return formatDateUTC_(date);
  }

  if (typeof(date) === "string") {
    return date;
  }

  return null;
}

/**
 * Takes an {@link module:Enums~Interval|Interval} and converts it to a string to be used as a parameter in a call to the PSS Fleet Data API.
 *
 * @param {(Interval|string)} interval - The interval to get converted. 
 * 
 * @return {(string|null)} - A {@link module:Enums~Interval|Interval} converted to its string representation, if the input value is of type {@link module:Enums~Interval|Interval}. The input, if the input is of type **string**. Else, **null**.
 */
function convertIntervalToParameter_(interval) {
  if (typeof(interval) === "object" && interval.type === "Interval") {
    return interval.value;
  }

  if (typeof(interval) === "string") {
    return interval;
  }

  return null;
}

/**
 * Makes a GET call to the PSS Fleet Data API endpoint specified by the given **path**, passing the specified parameters.
 *
 * @param {string} path - The url path to the endpoint to get data from. Does not include protocol or domain of the PSS Fleet Data API server.
 * @param {integer} [allianceId] - The **allianceId** parameter for the API endpoint. Replaces an **{allianceId}** placeholder in the **path** parameter.
 * @param {integer} [collectionId] - The **collectionId** parameter for the API endpoint. Replaces a **{collectionId}** placeholder in the **path** parameter.
 * @param {integer} [userId] - The **userId** parameter for the API endpoint. Replaces a **{userId}** placeholder in the **path** parameter.
 * @param {Date} [fromDate] - The earliest date for which data shall be returned.
 * @param {Date} [toDate] - The latest date for which data shall be returned.
 * @param {Interval} [interval] - Return the data from the specified time frame in hourly, daily (last Collection of a day) or monthly (last Collection of a month) interval.
 * @param {boolean} [desc] - Return the results in descending order by timestamp.
 * @param {integer} [skip] - Skip this number of results from the result set.
 * @param {integer} [take] - Limit the number of results returned. 
 * 
 * @return {HTTPResponse} - An object representing the response of the PSS Fleet Data API server.
 */
function getFromApiUrl_(path, allianceId, collectionId, userId, fromDate, toDate, interval, desc, skip, take) {
  path = path.replace("{allianceId}", allianceId).replace("{collectionId}", collectionId).replace("{userId}", userId);
  let parameters = constructParamsObject_(fromDate, toDate, interval, desc, skip, take);

  let url = assembleUrl_(API_BASE_URL + path, parameters);

  return getFromUrl_(url);
}

/**
 * Makes a GET call to a server represented by the given **URL**.
 *
 * @param {string} url - The URL to get.
 * 
 * @return {HTTPResponse} - An object representing the response of the requested server.
 */
function getFromUrl_(url) {
  let response = UrlFetchApp.fetch(url, FETCH_OPTIONS);
  return response;
}

/**
 * Takes a **Date** object and converts it to a string representing the UTC portion of it.
 *
 * @param {Date} datetime - The **Date** object to convert.
 * 
 * @return {(string|null)} - A string representing the UTC portion of the provided **Date**, if it's defined. Else, **null**. The resulting string resembles an ISO-8601 string without the 'T' separator nor timezone information.
 */
function formatDateUTC_(datetime) {
  if (!datetime) {
    return null;
  }

  return datetime.getUTCFullYear() + "-" + padInt_((datetime.getUTCMonth() + 1), 2) + "-" + padInt_(datetime.getUTCDate(), 2) + " " + padInt_(datetime.getUTCHours(), 2) + ":" + padInt_(datetime.getUTCMinutes(), 2) + ":" + padInt_(datetime.getUTCSeconds(), 2);
}

/**
 * Creates a new **Date** object with the UTC timezone regardless of the client's configured timezone.
 *
 * @param {integer} year - The year of the **Date** to be created.
 * @param {integer} [month] - The month of the **Date** to be created. Defaults to **0**.
 * @param {integer} [day] - The month of the **Date** to be created. Defaults to **1**.
 * @param {integer} [hour] - The hour of the **Date** to be created. Defaults to **0**.
 * @param {integer} [minute] - The minute of the **Date** to be created. Defaults to **0**.
 * @param {integer} [second] - The second of the **Date** to be created. Defaults to **0**.
 * 
 * @return {Date} - A **Date** with the provided values and in UTC timezone.
 */
function newDate_(year, month = 0, day = 1, hour = 0, minute = 0, second = 0) {
  let d = new Date(year, month, day, hour, minute, second);
  let dFormatted = formatDateUTC_(d);
  return new Date(dFormatted);
}

/**
 * Pads an integer with leading 0s.
 *
 * @param {integer} i - The **integer** to be padded.
 * @param {integer} padCount - The maximum number of leading 0s to pad the integer with.
 * 
 * @return {string} - A string representing an integer padded with leading 0s.
 */
function padInt_(i, padCount) {
  return String(i).padStart(padCount, "0");
}
