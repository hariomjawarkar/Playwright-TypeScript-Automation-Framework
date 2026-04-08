import { defineConfig, devices } from '@playwright/test';
import { ENV } from './config/env';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 15000 },
  fullyParallel: true,
  retries: 1,
  workers: 2,
  snapshotPathTemplate: '{testDir}/{testFileName}-snapshots/{arg}{ext}',

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

    launchOptions: {
      slowMo: 0,
      args: ['--hide-scrollbars'] 
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
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
