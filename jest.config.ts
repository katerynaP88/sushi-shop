import type { Config } from "jest";

const config: Config = { 
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true
      }
    ]
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  globals: {
    "ts-jest": {
      useESM: true
    }
  }
};

export default config;