import { defineConfig } from '@playwright/test';

export default defineConfig({

 testDir: './tests',

 retries: 2,

 workers: 4,

 reporter: [

  ['html'],

  ['./utils/customReporter.ts'],
 
  ['allure-playwright']
 ],

 use: {
    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "on-first-retry",

    launchOptions: {
      slowMo: 500
    }
  }
});