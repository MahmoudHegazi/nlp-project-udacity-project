const request = require('supertest');  // Use require instead of import
const app = require('../src/server/index.js');  // Use require instead of import

// start test server and test db sometimes if required

let server;

beforeAll(() => {
  server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});

describe('GET /, ############ Check Index Endpoint ############', () => {
  it('should respond with a message', async () => {
    const response = await request(app).get('/');
  });
});

describe('POST /nlp, ############ Check nlp Endpoint ############', () => {
  it('should respond with a message', async () => {
    const response = await request(app).post('/nlp'); // Correct POST request

    expect(response.status).toBe(200);
    // This checks that the response body is NOT the error message (no internal error test)
    expect(response.body.code).not.toEqual(500);
    expect(response.body.code).toEqual(200);
  });
}); 

// Properly close the server after all tests are finished
afterAll(async () => {
  await new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err);
      resolve();
    });
  });
});
