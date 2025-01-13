const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


// Or use require in older versions of Node.js
// const fetch = require('node-fetch');

dotenv.config();

const port = process.env.PORT ? process.env.PORT : 5000;

const app = express();

app.use(express.static('dist'));

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

// Variables for url and api key
const apiKey = process.env.API_KEY;

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});


// nlp
app.post('/nlp', function (req, res) {
    res.send({})
});


// Designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

module.exports = app;

