import { defineConfig, devices } from '@playwright/test'

// Tests dérivés de la spec (S1 à S14) — ADR-0002
// BASE_URL=https://ounokoya.github.io/newsletter-signup-form/ npm test : vérifie le site en ligne
const LOCAL = 'http://localhost:4173/newsletter-signup-form/'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE_URL || LOCAL,
    ...devices['Desktop Chrome'],
  },
  webServer: process.env.BASE_URL ? undefined : {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: LOCAL,
    reuseExistingServer: !process.env.CI,
  },
})
