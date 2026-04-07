import { test, expect } from '../fixtures/baseTest';
import { Logger } from '../utils/Logger';

test.describe('Visual Regression Testing @visual', () => {

  test('Login Page Visual Baseline', async ({ loginPage, page }) => {
    Logger.info("Taking visual baseline of Login Page...");
    
    // Step 1: Navigate to Landing Page
    await loginPage.navigateToLogin();
    
    // Step 2: Pixel-by-pixel comparison with high tolerance for environment discrepancies
    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixelRatio: process.env.CI ? 0.25 : 0.15, 
      animations: 'disabled',
      caret: 'hide',
      threshold: 0.3
    });
    
    Logger.info("Visual comparison passed successfully.");
  });

  test('Inventory Page Visual Baseline', async ({ page }) => {
    Logger.info("Taking visual baseline of Inventory (Logged in) Page...");
    
    // Note: We are already logged in thanks to storageState!
    await page.goto('/inventory.html');
    
    // Force strictly identical dimensions across Windows/Linux
    await page.setViewportSize({ width: 1280, height: 1110 });
    await page.addStyleTag({ content: 'body { min-height: 1110px !important; width: 1280px !important; overflow: hidden !important; }' });
    await page.waitForLoadState('networkidle');
    
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
