module.exports = {
    preset: 'ts-jest', // Use ts-jest preset
    testEnvironment: 'jsdom', // Set the test environment to jsdom
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mock CSS modules
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript files
      '^.+\\.(js|jsx)$': 'babel-jest', // Use babel-jest for JavaScript files
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)', // Transform axios to handle ES module syntax
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  };
  