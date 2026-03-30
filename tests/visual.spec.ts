import { test, expect } from '../fixtures/baseTest';
import { Logger } from '../utils/Logger';

test.describe('Visual Regression Testing @visual', () => {

  test('Login Page Visual Baseline', async ({ loginPage, page }) => {
    Logger.info("Taking visual baseline of Login Page...");
    
    // Step 1: Navigate to Landing Page
    await loginPage.navigateToLogin();
    
    // Step 2: Pixel-by-pixel comparison
    // The first run creates the baseline image. 
    // Subsequent runs compare against that image.
    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixels: 100, // Small tolerance for rendering differences
      threshold: 0.2
    });
    
    Logger.info("Visual comparison passed successfully.");
  });

  test('Inventory Page Visual Baseline', async ({ page }) => {
    Logger.info("Taking visual baseline of Inventory (Logged in) Page...");
    
    // Note: We are already logged in thanks to storageState!
    await page.goto('/inventory.html');
    
    // We can even mask elements that change (like dynamic IDs or dates)
    await expect(page).toHaveScreenshot('inventory-page.png', {
      mask: [page.locator('.footer_copy')], // Masking the footer if it varies
      fullPage: true
    });
    
    Logger.info("Inventory page visual comparison passed.");
  });

});
