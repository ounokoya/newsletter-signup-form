import { defineConfig, devices } from '@playwright/test'

// Tests dérivés de la spec (S1 à S14) — ADR-0002
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173/newsletter-signup-form/',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173/newsletter-signup-form/',
    reuseExistingServer: !process.env.CI,
  },
})
