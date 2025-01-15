const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const {
    analyzeUrl,
    concatSentences,
    sentimentAnalyze
} = require('./functions.js');


dotenv.config();

const port = process.env.PORT ? process.env.PORT : 5000;

const app = express();

app.use(express.static('dist'));

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());


// Variables for url and api key
const apiKey = process.env.API_KEY;


app.get('/', async function(req, res) {
    res.sendFile('dist/index.html');

});

// nlp
app.post('/nlp', async function(req, res) {
    try {
        const result = await analyzeUrl(apiKey, req.body.url);
        console.log('MeaningCloud Analysis Result:', result);

        const data = {
            agreement: result.agreement,
            subjectivity: result.subjectivity,
            confidence: result.confidence,
            irony: result.irony,
            sample: concatSentences(result.sentence_list, 300), // get max 300 chars only sample, excluded url only sentences and empty
            sentiment: sentimentAnalyze(result.sentence_list),
            url: req.body.url
        };

        res.send({
            code: 200,
            data: data
        });
    } catch (error) {
        console.console(error.message);
        // for secuirty u not ment to display errors programticly direct to user ({try} keyword  can return error for meaning cloud request)
        res.send({
            code: 500,
            message: 'Unable to process your request now, please try again later.'
        });
    }
});


// Designates what port the app will listen to for incoming requests
if (require.main === module) {
    app.listen(port, function() {
        // URL to be processed
        console.log(`app is running on Port: ${port}`);
    });
}



module.exports = app;