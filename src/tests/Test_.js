/**
 * Contains helper functions for testing.
 * 
 * @module Test_
 */

/**
 * Runs all tests and logs the results to the console.
 */
function runAllTests() {
  UnitTests_.runAllUnitTests();
  IntegrationTests_.runAllIntegrationTests();
}

class Tests_ {
  /**
   * Compares the **left** and **right** values for equality (**==**) and throws an exception, if those don't match.
   * 
   * @param {any} left - A value to compare.
   * @param {any} right - A value to compare.
   * @param {string} [message] - An optional message to attach to the exception thrown, if the assertion fails.
   * 
   * @throws {Error} - The provided values aren't equal (**==**).
   */
  static assert_equal_(left, right, message = undefined) {
    if (left != right) {
      Tests_.throw_assertion_error_(left + " != " + right, message);
    }
  }

  /**
   * Compares the **left** and **right** values for strict equality (**===**) and throws an exception, if those don't match.
   * 
   * @param {any} left - A value to compare.
   * @param {any} right - A value to compare.
   * @param {string} [message] - An optional message to attach to the exception thrown, if the assertion fails.
   * 
   * @throws {Error} - The provided values aren't strictly equal (**===**).
   */
  static assert_strictly_equal_(left, right, message = undefined) {
    if (left !== right) {
      Tests_.throw_assertion_error_(left + " !== " + right, message);
    }
  }

  /**
   * Compares the **left** and **right** objects for shallow equality (**==** only on the first level) and throws an exception, if those don't match. Doesn't perform a deep check on nested objects.
   * 
   * @param {object} left - An object to compare.
   * @param {object} right - An object to compare.
   * @param {string} [message] - An optional message to attach to the exception thrown, if the assertion fails.
   * 
   * @throws {Error} - If one of the provided objects is falsy and the other isn't. If the provided objects have a different number of keys. If the provided objects have different keys. If the keys of the provided objects don't return equal (**==**) values.
   */
  static assert_objects_equal_(left, right, message = undefined) {
    if (!left && !right) {
      return;
    }

    if (!left && right || left && !right) {
      Tests_.throw_assertion_error_(left + " != " + right, message);
    }

    let leftKeys = Object.keys(left);
    let rightKeys = Object.keys(right);
    if (leftKeys.length != rightKeys.length) {
      throw_assertion_error_(left + " != " + right, message);
    }

    leftKeys.forEach(key => {
      if (!rightKeys.includes(key)) {
        Tests_.throw_assertion_error_(left + " != " + right, message);
      }
      if (left[key] != right[key]) {
        Tests_.throw_assertion_error_(left + " != " + right, message);
      }
    });
  }

  /**
   * Compares the **left** and **right** objects for shallow strict equality (**===** only on the first level) and throws an exception, if those don't match. Doesn't perform a deep check on nested objects.
   * 
   * @param {object} left - An object to compare.
   * @param {object} right - An object to compare.
   * @param {string} [message] - An optional message to attach to the exception thrown, if the assertion fails.
   * 
   * @throws {Error} - If one of the provided objects is falsy and the other isn't. If the provided objects have a different number of keys. If the provided objects have different keys. If the keys of the provided objects don't return strictly equal (**===**) values.
   */
  static assert_objects_strictly_equal_(left, right, message = undefined) {
    if (!left && !right) {
      return;
    }

    if (!left && right || left && !right) {
      Tests_.throw_assertion_error_(left + " != " + right, message);
    }

    let leftKeys = Object.keys(left);
    let rightKeys = Object.keys(right);
    if (leftKeys.length != rightKeys.length) {
      Tests_.throw_assertion_error_(left + " != " + right, message);
    }

    leftKeys.forEach(key => {
      if (!rightKeys.includes(key)) {
        Tests_.throw_assertion_error_(left + " != " + right, message);
      }
      if (left[key] !== right[key]) {
        Tests_.throw_assertion_error_(left + " != " + right, message);
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
  static assert_(value, message = undefined) {
    if (!value) {
      Tests_.throw_assertion_error_(value + " is not truthy", message);
    }
  }

  /**
   * Throws an exception with the given default message or a user-provided custom message.
   * 
   * @param {string} message - The message to attach to the exception thrown.
   * @param {string} [userMessage] - An optional message to attach to the exception thrown instead of the default **message**.
   * 
   * @throws {Error} - Always.
   */
  static throw_assertion_error_(message, userMessage = undefined) {
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
  static runTests_(tests) {
    tests.forEach(testFunction => {
      console.log("Running test '" + testFunction.name + "'");
      try {
        testFunction();
      }
      catch (error) {
        console.error("FAIL: " + error.message);
      }
    });
  }
}
