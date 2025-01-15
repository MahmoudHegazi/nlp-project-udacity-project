const {
    handleSubmit
} = require('../src/client/js/formHandler.js');

const {
    checkForURL
} = require('../src/client/js/urlChecker.js');

import {
    displayAlert
} from '../src/client/js/functions.js';

import fs from 'fs';
import path from 'path';

// start test server and test db sometimes if required

// used jsdom, which include document, now get the html content manual from page and assign to the document to check functions that use document and check elements
let htmlContent;
beforeAll(() => {
    // Read the actual HTML file content
    htmlContent = fs.readFileSync(path.resolve(__dirname, '../src/client/views/index.html'), 'utf8');

    // Inject the HTML content into the jsdom document body
    document.documentElement.innerHTML = htmlContent;
});


describe("Testing formHandler.js", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the handleSubmit() function", () => {
        expect(handleSubmit).toBeDefined();
    });
});

describe("Testing the Functions.js", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the displayAlert() function", () => {
        expect(displayAlert).toBeDefined();

        // add message return true
        const notEmptyMessageReturnTrue = displayAlert('Message', 'danger');
        expect(notEmptyMessageReturnTrue).toBe(true);

        // clear message return false
        const emptyMessageReturnFalse = displayAlert();
        expect(emptyMessageReturnFalse).toBe(false);


    });
});

describe("Testing urlChecker.js", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the checkForURL() function", () => {
        expect(checkForURL).toBeDefined();

        const invalidUrlCheckReturnFalse = checkForURL('invalid');
        expect(invalidUrlCheckReturnFalse).toBe(false);

        const validUrlReturnTrue = checkForURL('www.google.com');
        expect(validUrlReturnTrue).toBe(true);
    })
});


afterAll(() => {
    htmlContent = '';
    document.documentElement.innerHTML = htmlContent;
});