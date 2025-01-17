const {defaults} = require('jest-config');

module.exports = async () => {
  return {
    roots: ["<rootDir>/src"],
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
    },
    transformIgnorePatterns: [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    ],
    moduleNameMapper: {
      "^.+\\.module\\.css$": "identity-obj-proxy",
      "^.+\\.(css|png|jpg|jpeg)$": "identity-obj-proxy",
    },
    verbose: true,
    collectCoverage: true,
    coverageReporters: [...defaults.coverageReporters, "text-summary"],
  };
};
