/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  verbose: true,
  clearMocks: true,
  // Usa o setup específico para E2E (com banco real)
  setupFilesAfterEnv: ["<rootDir>/__tests__/e2e/setup.ts"],
  // Só roda testes E2E
  testMatch: ["<rootDir>/__tests__/e2e/**/*.test.ts"],
  // Timeout maior para testes E2E
  testTimeout: 30000,
  // Roda os testes em série (não paralelo) para evitar conflitos de banco
  maxWorkers: 1,
};
