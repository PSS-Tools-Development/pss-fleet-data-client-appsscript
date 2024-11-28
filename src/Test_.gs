/**
 * Runs all tests and logs the results to the console.
 * @module Test_
 */
function runAllTests() {
  runAllUnitTests();
  runAllIntegrationTests();
}

/**
 * Compares the `left` and `right` values for equality (`==`) and throws an exception, if those don't match.
 * 
 * @param {any} left - A value to compare.
 * @param {any} right - A value to compare.
 * @param {string} [message] - An optional message to attach to the exception thrown, if the assertion fails.
 * 
 * @throws {Error} - The provided values aren't equal (`==`).
 */
function assert_equal_(left, right, message = undefined) {
  if (left != right) {
    throw_assertion_error_(left + " != " + right, message);
  }
}

/**
 * Compares the `left` and `right` values for strict equality (`===`) and throws an exception, if those don't match.
 * 
 * @param {any} left - A value to compare.
 * @param {any} right - A value to compare.
 * @param {string} [message] - An optional message to attach to the exception thrown, if the assertion fails.
 * 
 * @throws {Error} - The provided values aren't strictly equal (`===`).
 */
function assert_strictly_equal_(left, right, message = undefined) {
  if (left !== right) {
    throw_assertion_error_(left + " !== " + right, message);
  }
}

/**
 * Compares the `left` and `right` objects for shallow equality (`==` only on the first level) and throws an exception, if those don't match. Doesn't perform a deep check on nested objects.
 * 
 * @param {object} left - An object to compare.
 * @param {object} right - An object to compare.
 * @param {string} [message] - An optional message to attach to the exception thrown, if the assertion fails.
 * 
 * @throws {Error} - If one of the provided objects is falsy and the other isn't. If the provided objects have a different number of keys. If the provided objects have different keys. If the keys of the provided objects don't return equal (`==`) values.
 */
function assert_objects_equal_(left, right, message = undefined) {
  if (!left && !right) {
    return;
  }

  if (!left && right || left && !right) {
    throw_assertion_error_(left + " != " + right, message);
  }

  let leftKeys = Object.keys(left);
  let rightKeys = Object.keys(right);
  if (leftKeys.length != rightKeys.length) {
    throw_assertion_error_(left + " != " + right, message);
  }

  leftKeys.forEach(key => {
    if (!rightKeys.includes(key)) {
      throw_assertion_error_(left + " != " + right, message);
    }
    if (left[key] != right[key]) {
      throw_assertion_error_(left + " != " + right, message);
    }
  });
}

/**
 * Compares the `left` and `right` objects for shallow strict equality (`===` only on the first level) and throws an exception, if those don't match. Doesn't perform a deep check on nested objects.
 * 
 * @param {object} left - An object to compare.
 * @param {object} right - An object to compare.
 * @param {string} [message] - An optional message to attach to the exception thrown, if the assertion fails.
 * 
 * @throws {Error} - If one of the provided objects is falsy and the other isn't. If the provided objects have a different number of keys. If the provided objects have different keys. If the keys of the provided objects don't return strictly equal (`===`) values.
 */
function assert_objects_strictly_equal_(left, right, message = undefined) {
  if (!left && !right) {
    return;
  }

  if (!left && right || left && !right) {
    throw_assertion_error_(left + " != " + right, message);
  }

  let leftKeys = Object.keys(left);
  let rightKeys = Object.keys(right);
  if (leftKeys.length != rightKeys.length) {
    throw_assertion_error_(left + " != " + right, message);
  }

  leftKeys.forEach(key => {
    if (!rightKeys.includes(key)) {
      throw_assertion_error_(left + " != " + right, message);
    }
    if (left[key] !== right[key]) {
      throw_assertion_error_(left + " != " + right, message);
    }
  });
}

/**
 * Checks, if the provided value is truthy and throws an exception if not.
 * 
 * @param {any} value - The value to check.
 * @param {string} [message] - An optional message to attach to the exception thrown, if the assertion fails.
 * 
 * @throws {Error} - If the provided value is not truthy.
 */
function assert_(value, message = undefined) {
  if (!value) {
    throw_assertion_error_(value + " is not truthy", message);
  }
}

/**
 * Throws an exception with the given default message or a user-provided custom message.
 * 
 * @param {string} message - The message to attach to the exception thrown.
 * @param {string} [userMessage] - An optional message to attach to the exception thrown instead of the default `message`.
 * 
 * @throws {Error} - Always.
 */
function throw_assertion_error_(message, userMessage = undefined) {
  if (userMessage) {
    throw Error("Assertion failed: " + userMessage);
  }
  throw Error("Assertion failed: " + message);
}

/**
 * Runs an array of parameterless test functions and logs the results to the console.
 * 
 * @param {Array} tests - An array of paramterless functions, each representing a test to be performed.
 */
function runTests_(tests) {
  tests.forEach(testFunction => {
    console.log("Running test '" + testFunction.name + "': ");
    try {
      testFunction();
    }
    catch (error) {
      console.error("FAIL: " + error.message);
    }
  });
}
