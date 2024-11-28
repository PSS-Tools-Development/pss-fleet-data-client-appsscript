/**
 * @module Constants
 */

/** @const {string} - The default base URL of the PSS Fleet Data API. */
const API_BASE_URL = "https://fleetdata.dolores2.xyz";

/** @const {object} - The default options for fetching data from the PSS Fleet Data API. */
const FETCH_OPTIONS = Object.freeze({
  'contentType': 'application/json',
  'method': 'GET',
  'muteHttpExceptions': true
});

/** @const {Date} - The date on which Pixel Starships entered the public beta (Jan 6th, 2016). */
const PSS_START_DATE = newDate_(2016, 0, 6);  // Jan 6th, 2016

/** @const {integer} - The number of milliseconds representing the date on which Pixel Starships entered the public beta. */
const PSS_START_DATE_MS = PSS_START_DATE.getTime();  // milliseconds
