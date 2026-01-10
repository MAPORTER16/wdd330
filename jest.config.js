module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|mjs)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "mjs"],
  testMatch: ["**/test/**/*.test.js"],
  transformIgnorePatterns: ["node_modules/(?!(your-es-module-package)/)"],
};
