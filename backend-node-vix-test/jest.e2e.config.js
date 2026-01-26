/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  verbose: true,
  clearMocks: true,
  // Setup que roda antes dos testes E2E (cria DB, migrations, seed)
  setupFilesAfterEnv: ["<rootDir>/__tests__/e2e/setup.ts"],
  // Padrão de arquivos de teste E2E
  testMatch: ["**/__tests__/e2e/**/*.test.ts"],
  // Ignora arquivos auxiliares
  testPathIgnorePatterns: [
    "<rootDir>/__tests__/e2e/setup.ts",
    "<rootDir>/__tests__/e2e/helpers.ts",
  ],
  // Timeout maior para E2E
  testTimeout: 30000,
  // Roda testes sequencialmente
  maxWorkers: 1,
};
