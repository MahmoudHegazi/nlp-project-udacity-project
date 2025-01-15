const {
    concatSentences,
    sentimentAnalyze,
} = require('../../server/functions.js');

const app = require('../../server/index.js');

describe("Testing functions.js", () => {
    // concatSentences, takes a list of sentences, and except from it first remove the false && not string values and also remove empty and finally return the string not max the max argument
    test("Testing the concatSentences() function", () => {
        expect(concatSentences).toBeDefined();

        // test is method filtered out the empty, and make correct concat
        const testEmpty = [{
            text: 'Test larger text'
        }, {
            text: '  '
        }, {
            text: 'test'
        }];
        const concated = concatSentences(testEmpty);
        expect(concated).toBe('Test larger text test...');

    });

    test("Testing the sentimentAnalyze() function: check sentiment and confirm it positive for clear postive string", () => {
        const iamPositveString = sentimentAnalyze([{
            text: "Hello i love js"
        }]);
        expect(iamPositveString).toBe('Positive');
    });
});

describe("Testing index.js", () => {
    // concatSentences, takes a list of sentences, and except from it first remove the false && not string values and also remove empty and finally return the string not max the max argument
    test("Testing the app defined", () => {
        expect(app).toBeDefined();
    });
});