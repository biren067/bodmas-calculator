/**
 * Jest Configuration for React Native
 * Uncomment and customize as needed for testing
 */

module.exports = {
  preset: "react-native",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.js", "**/*.test.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  collectCoverageFrom: ["src/**/*.js", "!src/**/*.test.js", "!src/index.js"],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};
