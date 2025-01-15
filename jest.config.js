module.exports = {
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    projects: [{
            /* speacfic test for client using jsdom env */
            displayName: 'client',
            testEnvironment: 'jsdom',
            testMatch: ['<rootDir>/src/tests/client/*.test.js'],
        },
        {
            /* speacfic test for server using node env */
            displayName: 'server',
            testEnvironment: 'node',
            testMatch: ['<rootDir>/src/tests/server/*.test.js'],
        },
    ]
};