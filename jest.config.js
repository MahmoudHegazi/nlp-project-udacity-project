module.exports = {
    testEnvironment: 'node', // Set the test environment to Node.js
    testMatch: ['**/?(*.)+(test|spec).[jt]s?(x)'], // Match test files with .test.js or .spec.js
    verbose: true, // Show individual test results with the test suite hierarchy
};

/*
testEnvironment:
Sets the environment for your tests to node. This is suitable for testing Node.js applications.
testMatch:
Detects test files with names like *.test.js or *.spec.js in any folder. important
verbose:
Displays detailed information about each test that runs.
*/