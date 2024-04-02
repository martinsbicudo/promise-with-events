const config = {
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["./src/**"],
  coverageReporters: ["json-summary", "html"],
  coverageThreshold: {
    global: {
      branches: 76.47,
      functions: 87.5,
      lines: 83.67,
      statements: 84.9,
    },
  },
};

module.exports = config;
