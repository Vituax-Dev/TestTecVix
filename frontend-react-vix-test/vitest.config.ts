import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest-setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "node_modules",
        "tests",
        "src/main.tsx",
        "src/stores",
        "src/vite-env.d.ts",
        "src/hooks",
        "src/services",
        "src/utils",
        "src/assets",
        "src/languages",
        "src/configs",
        "src/routes",
      ],
      all: true,
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
});
