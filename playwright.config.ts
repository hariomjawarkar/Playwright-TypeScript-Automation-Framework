import { defineConfig, devices } from '@playwright/test';
import { ENV } from './config/env';

export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  expect: { timeout: 15000 },
  fullyParallel: true,
  retries: 2,
  workers: process.env.CI ? 2 : 1,
  snapshotPathTemplate: '{testDir}/{testFileName}-snapshots/{arg}-{platform}{ext}',

  // High-end pattern: Auth reuse
  globalSetup: require.resolve('./utils/global-setup'),

  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['./utils/customReporter.ts']
  ],

  use: {
    baseURL: ENV.baseURL,
    // Reuse auth state for faster tests
    storageState: './assets/auth.json',

    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
    actionTimeout: 15000,
    navigationTimeout: 30000,

    launchOptions: {
      slowMo: 0
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--hide-scrollbars', '--disable-gpu', '--no-sandbox']
        }
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ]
});
