import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    ui: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html'],
      reportsDirectory: './coverage'
    },
  },
})