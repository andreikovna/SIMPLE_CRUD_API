export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleFileExtensions: [
    "js",
    "ts",
  ],
  preset: 'ts-jest',
  roots: [
    '<rootDir>/src/tests',
  ],
  testEnvironment: "node",
};
