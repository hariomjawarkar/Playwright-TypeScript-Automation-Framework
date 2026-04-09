import { test, expect } from '../fixtures/baseTest';
import { Logger } from '../utils/Logger';

test.describe('Visual Regression Testing @visual', () => {
  test.slow(); // Visual tests need extra time for rendering and comparison

  test.describe('Non-authenticated', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('Login Page Visual Baseline', async ({ loginPage, page }) => {
      Logger.info("Taking visual baseline of Login Page...");
      
      await expect(page).toHaveScreenshot('login-page.png', {
        maxDiffPixelRatio: process.env.CI ? 0.25 : 0.15, 
        animations: 'disabled',
        caret: 'hide',
        threshold: 0.3
      });
      
      Logger.info("Visual comparison passed successfully.");
    });
  });

  test.describe('Authenticated', () => {
    // Uses global storageState by default

    test('Inventory Page Visual Baseline', async ({ page }) => {
      Logger.info("Taking visual baseline of Inventory (Logged in) Page...");
      
      // Navigate and wait for full load to avoid context destruction
      await page.goto('/inventory.html', { waitUntil: 'load' });
      
      // Force strictly identical dimensions across Windows/Linux
      await page.setViewportSize({ width: 1280, height: 1110 });
      
      // Wait for the inventory list to be present BEFORE injecting style
      await page.locator('.inventory_list').waitFor({ state: 'visible' });

      // Inject style to freeze layout and hide scrollbars
      await page.addStyleTag({ content: 'body { min-height: 1110px !important; width: 1280px !important; overflow: hidden !important; }' });
      
      await expect(page).toHaveScreenshot('inventory-page.png', {
        mask: [page.locator('.footer_copy')], 
        clip: { x: 0, y: 0, width: 1280, height: 1110 },
        maxDiffPixelRatio: process.env.CI ? 0.25 : 0.15, 
        animations: 'disabled',
        caret: 'hide',
        threshold: 0.3
      });
      
      Logger.info("Inventory page visual comparison completed with optimized tolerances.");
    });
  });

  test.describe('Responsive / Mobile', () => {
    test('Inventory Page Visual Mobile Viewport', async ({ page }) => {
      Logger.info("Taking visual baseline of Inventory Page on Mobile Viewport...");
      
      // Set mobile dimensions (iPhone 13 style)
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/inventory.html', { waitUntil: 'domcontentloaded' });
      
      // Wait for the mobile menu to be visible (burger icon)
      await page.locator('#react-burger-menu-btn').waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot('inventory-mobile.png', {
        animations: 'disabled',
        maxDiffPixelRatio: 0.15,
        threshold: 0.3,
        caret: 'hide'
      });
      
      Logger.info("Mobile visual comparison completed.");
    });
  });

});
