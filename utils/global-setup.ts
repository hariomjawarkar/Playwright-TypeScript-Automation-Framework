import { chromium, type FullConfig } from '@playwright/test';
import { ENV } from '../config/env';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log(`GLOBAL SETUP: Logging in to ${ENV.environmentName} for authenticated state...`);
  
  await page.goto(ENV.baseURL, { waitUntil: 'domcontentloaded' });
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  
  // Wait for navigation or successful login indication
  await page.waitForURL('**/inventory.html', { timeout: 10000 });
  
  const fs = require('fs');
  const path = require('path');
  const assetsDir = path.resolve(__dirname, '../assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Save storage state into a JSON file
  await page.context().storageState({ path: './assets/auth.json' });
  
  await browser.close();
}

export default globalSetup;
