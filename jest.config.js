// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './src',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@/store/(.*)$': '<rootDir>/src/store/$1',
    '^@/test-utils/(.*)$': '<rootDir>/test-utils/$1',
    '^@/config/(.*)$': '<rootDir>/config/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/wrappers/(.*)$': '<rootDir>/src/wrappers/$1',
    '^@/layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^@/containers/(.*)$': '<rootDir>/src/containers/$1',
    '^@/modals/(.*)$': '<rootDir>/src/modals/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  coveragePathIgnorePatterns: ['index.ts'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)