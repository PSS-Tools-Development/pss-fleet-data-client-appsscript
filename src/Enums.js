/**
 * This module contains "Enums".
 * 
 * @module Enums
 */

const AllianceMembership = Object.freeze({
	NONE: Object.freeze({type: "AllianceMembership", name: "None", value: -1}),
	FLEET_ADMIRAL: Object.freeze({type: "AllianceMembership", name: "FleetAdmiral", value: 0}),
	VICE_ADMIRAL: Object.freeze({type: "AllianceMembership", name: "ViceAdmiral", value: 1}),
	COMMANDER: Object.freeze({type: "AllianceMembership", name: "Commander", value: 2}),
	MAJOR: Object.freeze({type: "AllianceMembership", name: "Major", value: 3}),
	LIEUTENANT: Object.freeze({type: "AllianceMembership", name: "Lieutenant", value: 4}),
	ENSIGN: Object.freeze({type: "AllianceMembership", name: "Ensign", value: 5}),
	CANDIDATE: Object.freeze({type: "AllianceMembership", name: "Candidate", value: 6})
});

const Interval = Object.freeze({
	MONTHLY: Object.freeze({type: "Interval", name: "month", value: "month"}),
	DAILY: Object.freeze({type: "Interval", name: "day", value: "day"}),
	HOURLY: Object.freeze({type: "Interval", name: "hour", value: "hour"}),
});
