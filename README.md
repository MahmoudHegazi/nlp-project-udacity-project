### Udacity Front-end project (NLP)

# About:
This application is a Node.js Express web app designed for dynamically scraping the content of a provided URL and performing analysis on the text using the MeaningCloud API.

# how to start
1. in the terminal nevgiate to the folder directory include the project then run ```npm install```
2. then run the command ```npm run build-run-prod``` that commands will build the project files, then it will direct start the server.
3. how to run project in dev mode use ```npm run build-dev```
4. how to run test ```npm run test```

# endpoints:

* / [GET]
    * this loads the frontend index.html page

* /nlp [POST]
    * this accept JSON request thats includes the url and communicate with meaningcloud api to run the NLP and return the result for the client side (AJAX endpoint)

# Tests:
1. Testing formHandler.js
2. Testing Functions.js
3. Testing urlChecker.js

Note: jsdom is used to simulate document-related methods for more accurate testing.

# Author:
Mahmoud Hegazy