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
  
  // Increased timeout for CI stability and used 'networkidle' for state persistence
  await page.waitForURL('**/inventory.html', { timeout: 30000, waitUntil: 'networkidle' });
  
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
