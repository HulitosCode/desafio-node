import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    ui: true,
    testTimeout: 15000, // 15 segundos
    hookTimeout: 15000, // também aumenta hooks como beforeAll
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "text-summary", "html"],
      reportsDirectory: "./coverage",
    },
  },
});
