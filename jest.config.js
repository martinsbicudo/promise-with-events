const config = {
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["./src/**"],
  coverageReporters: ["json-summary", "html"],
  coverageThreshold: {
    global: {
      branches: 91.3,
      functions: 81.08,
      lines: 90.62,
      statements: 88,
    },
  },
};

module.exports = config;
