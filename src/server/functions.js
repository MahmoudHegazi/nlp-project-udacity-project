const Sentiment = require('sentiment');
const axios = require('axios');

// sentiment configure
const sentiment = new Sentiment();

async function analyzeUrl(apiKey, url) {
    try {
        const response = await axios.post(
            'https://api.meaningcloud.com/sentiment-2.1',
            new URLSearchParams({
                key: apiKey, // API Key
                url: url, // The URL to analyze
                lang: 'en', // Language of the content to analyze
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        return response.data; // Return the MeaningCloud response
    } catch (error) {
        console.error('Error communicating with MeaningCloud:', error.response?.data || error.message);
        throw new Error('Failed to analyze the URL.');
    }
}
// remove the sentence if not string or empty
function filterSentences(txt) {
    return !txt || typeof(txt) !== 'string' || txt.trim() == '' ? false : true;
}

// this to create sample of the senetences and url excluded
function concatSentences(sentence_list, max = 300) {
    const filteredSentences = sentence_list.filter((sentence) => {
        return filterSentences(sentence.text);
    });
    return (filteredSentences.reduce((a, current) => (a + current.text), '').slice(0, max).concat("..."));
}

function sentimentAnalyze(sentence_list) {
    let sentimentRes = '';
    const txt = (sentence_list.reduce((a, current) => (a + current.text), ''));
    if (txt) {
        console.log(sentiment.analyze);

        const shit = sentiment.analyze(txt);
        const sentimentNum = parseInt(shit.score);
        if (!isNaN(sentimentNum)) {
            sentimentRes = (sentimentNum < 0.5) ? 'Negative' : 'Positive';
        }
    }
    return sentimentRes;
}


module.exports = {
    analyzeUrl,
    concatSentences,
    sentimentAnalyze,
    sentiment
};