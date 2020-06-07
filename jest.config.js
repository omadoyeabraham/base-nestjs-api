/* eslint-disable */
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
  },
  testTimeout: 30000,
};

// module.exports = {
//   preset: 'ts-jest',
//   rootDir: '.',
//   testEnvironment: 'node',
//   moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
//     prefix: '<rootDir>/',
//   }),
// };
