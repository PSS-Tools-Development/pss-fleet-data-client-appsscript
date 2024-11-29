/**
 * Contains unit tests.
 * 
 * @module Test_unit_
 */

class UnitTests_ {
  /**
   * Runs all unit tests and logs the results to the console.
   */
  static runAllUnitTests() {
    let tests = [
      UnitTests_.test_decodeFleetRank_returnsCorrectFleetRank_,
      UnitTests_.test_decodeFleetRank_returnsNullOnInvalidValues_,
      UnitTests_.test_decodeTimestamp_returnsCorrectDate_,
      UnitTests_.test_decodeTimestamp_returnsNullOnFalsyInput_,
      UnitTests_.test_convertDateToParameter_returnsFormattedStringOnDateInput_,
      UnitTests_.test_convertDateToParameter_returnsInputOnStringInput_,
      UnitTests_.test_convertDateToParameter_returnsNullOnNonStringNonDateInput_,
      UnitTests_.test_constructParamsObject_returnsCorrectObject_,
      UnitTests_.test_padInt_returnsCorrectResult_,
    ];

    Tests_.runTests_(tests);
  }

  static test_padInt_returnsCorrectResult_() {
    let testCases = [
      {input: {integer: 8, padCount: 0}, expectedResult: "8"},
      {input: {integer: 8, padCount: 1}, expectedResult: "8"},
      {input: {integer: 8, padCount: 2}, expectedResult: "08"},
      {input: {integer: 8, padCount: 10}, expectedResult: "0000000008"},
    ]

    testCases.forEach(testCase => {
      let input = JSON.stringify(testCase.input);
      let expectedResult = JSON.stringify(testCase.expectedResult);
      let result = padInt_(testCase.input.integer, testCase.input.padCount);
      Tests_.assert_objects_equal_(result, testCase.expectedResult, "Input: " + input + ", expected output: " + expectedResult + ", actual output: " + JSON.stringify(result));
    });
  }

  static test_constructParamsObject_returnsCorrectObject_() {
    let testCases = [
      {
        input: {
          fromDate: undefined,
          toDate: undefined,
          interval: undefined,
          desc: undefined,
          skip: undefined,
          take: undefined,
        },
        expectedResult: {}
      },
      {input : {fromDate: "2024-01-01"}, expectedResult: {fromDate: "2024-01-01"}},
      {input : {fromDate: newDate_(2024, 0, 1)}, expectedResult: {fromDate: "2024-01-01 00:00:00"}},
      {input : {toDate: "2024-01-01"}, expectedResult: {toDate: "2024-01-01"}},
      {input : {toDate: newDate_(2024, 0, 1)}, expectedResult: {toDate: "2024-01-01 00:00:00"}},
      {input : {desc: false}, expectedResult: {desc: false}},
      {input : {desc: true}, expectedResult: {desc: true}},
      {input : {interval: Interval.DAILY}, expectedResult: {interval: "day"}},
      {input : {interval: "month"}, expectedResult: {interval: "month"}},
      {input : {skip: 0}, expectedResult: {skip: 0}},
      {input : {skip: "0"}, expectedResult: {skip: "0"}},
      {input : {take: 100}, expectedResult: {take: 100}},
      {input : {take: "100"}, expectedResult: {take: "100"}},
      {
        input : {
          fromDate: "2024-01-01",
          toDate: "2024-01-01",
          interval: Interval.DAILY,
          desc: false,
          skip: 0,
          take: 100,
        },
        expectedResult: 
        {
          fromDate: "2024-01-01",
          toDate: "2024-01-01",
          interval: "day",
          desc: false,
          skip: 0,
          take: 100,
        },
      },
    ]

    testCases.forEach(testCase => {
      let input = JSON.stringify(testCase.input);
      let expectedResult = JSON.stringify(testCase.expectedResult);
      let result = constructParamsObject_(testCase.input.fromDate, testCase.input.toDate, testCase.input.interval, testCase.input.desc, testCase.input.skip, testCase.input.take);
      Tests_.assert_objects_equal_(result, testCase.expectedResult, "Input: " + input + ", expected output: " + expectedResult + ", actual output: " + JSON.stringify(result));
    });
  }

  static test_convertDateToParameter_returnsFormattedStringOnDateInput_() {
    let testCases = [
      {input: new Date(PSS_START_DATE.getTime()), expectedResult: "2016-01-06 00:00:00"},
      {input: newDate_(2024, 8, 14), expectedResult: "2024-09-14 00:00:00"},
      {input: newDate_(2024, 8, 14, 23, 45, 56), expectedResult: "2024-09-14 23:45:56"},
    ]

    testCases.forEach(testCase => {
      let result = convertDateToParameter_(testCase.input);
      Tests_.assert_strictly_equal_(result, testCase.expectedResult, "Input: " + testCase.input + ", expected output: " + testCase.expectedResult + ", actual output: " + result);
    });
  }

  static test_convertDateToParameter_returnsInputOnStringInput_() {
    let testCases = [
      {input: "", expectedResult: ""},
      {input: "2024-09-14 00:00:00", expectedResult: "2024-09-14 00:00:00"},
      {input: "random text", expectedResult: "random text"},
    ]

    testCases.forEach(testCase => {
      let result = convertDateToParameter_(testCase.input);
      Tests_.assert_strictly_equal_(result, testCase.expectedResult, "Input: " + testCase.input + ", expected output: " + testCase.expectedResult + ", actual output: " + result);
    });
  }

  static test_convertDateToParameter_returnsNullOnNonStringNonDateInput_() {
    let testCases = [
      {input: true},
      {input: false},
      {input: 8},
      {input: 8.1},
      {input: {}},
      {input: {key: "value"}},
      {input: []},
    ]

    testCases.forEach(testCase => {
      let result = convertDateToParameter_(testCase.input);
      Tests_.assert_strictly_equal_(result, null, "Input: " + testCase.input + ", expected output: " + null + ", actual output: " + result);
    });
  }

  static test_decodeFleetRank_returnsCorrectFleetRank_() {
    let testCases = [
      {input: -1, expectedResult: AllianceMembership.NONE},
      {input: 0, expectedResult: AllianceMembership.FLEET_ADMIRAL},
      {input: 1, expectedResult: AllianceMembership.VICE_ADMIRAL},
      {input: 2, expectedResult: AllianceMembership.COMMANDER},
      {input: 3, expectedResult: AllianceMembership.MAJOR},
      {input: 4, expectedResult: AllianceMembership.LIEUTENANT},
      {input: 5, expectedResult: AllianceMembership.ENSIGN},
      {input: 6, expectedResult: AllianceMembership.CANDIDATE},
    ]

    testCases.forEach(testCase => {
      let result = decodeFleetRank_(testCase.input);
      Tests_.assert_strictly_equal_(result, testCase.expectedResult, "Input: " + testCase.input + ", expected output: " + testCase.expectedResult + ", actual output: " + result);
    });
  }

  static test_decodeFleetRank_returnsNullOnInvalidValues_() {
    let testCases = [
      {input: -2},
      {input: 7},
    ]

    testCases.forEach(testCase => {
      let result = decodeFleetRank_(testCase.input);
      Tests_.assert_strictly_equal_(result, null, "Input: " + testCase.input + ", expected output: " + null + ", actual output: " + result);
    });
  }

  static test_decodeTimestamp_returnsCorrectDate_() {
    let testCases = [
      {input: 0, expectedResult: new Date(PSS_START_DATE.getTime())},
      {input: 60, expectedResult: new Date(PSS_START_DATE.getTime() + 60000)},
      {input: 86400, expectedResult: new Date(PSS_START_DATE.getTime() + 86400000)},
    ]

    testCases.forEach(testCase => {
      let result = decodeTimestamp_(testCase.input);
      Tests_.assert_equal_(result.getTime(), testCase.expectedResult.getTime(), "Input: " + testCase.input + ", expected output: " + testCase.expectedResult + ", actual output: " + result);
    });
  }

  static test_decodeTimestamp_returnsNullOnFalsyInput_() {
    let testCases = [
      {input: null},
      {input: undefined},
      {input: ""},
      {input: NaN},
      {input: false},
    ]

    testCases.forEach(testCase => {
      let result = decodeTimestamp_(testCase.timestamp);
      Tests_.assert_equal_(result, null, "Input: " + testCase.timestamp + ", expected output: " + null + ", actual output: " + result);
    });
  }
}
