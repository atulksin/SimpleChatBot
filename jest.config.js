module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};