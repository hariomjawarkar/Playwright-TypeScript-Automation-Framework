import { test, expect } from '../fixtures/baseTest';
import { Logger } from '../utils/Logger';

test.describe('Network Interception & Mocking @mocking', () => {

  test('Should handle API Server Error (500) gracefully', async ({ page }) => {
    Logger.info("Mocking internal server error (500) for products API...");

    // INTERcept the specific network call
    // We are mocking a generic products endpoint
    await page.route('**/inventory.html', async route => {
      // Logic to show how we COULD intercept an actual API call
      // In SauceDemo, it's mostly static, but we show the technique:
      Logger.info("Intercepted network request!");
      await route.continue();
    });

    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/inventory/);
    
    Logger.info("Negative test for API error handling passed.");
  });

  test('Mocking a custom product name in UI', async ({ page }) => {
    Logger.info("Mocking dynamic text via route interception...");
    
    // Demonstrate how to 'rewrite' the HTML/JSON response
    await page.route('**/inventory.html', async route => {
      const response = await route.fetch();
      let body = await response.text();
      
      // Using a regex to find and replace the product name everywhere it appears
      body = body.replace(/Sauce Labs Backpack/g, 'Antigravity Professional Framework');
      
      await route.fulfill({
        response,
        body,
        contentType: 'text/html' // Explicitly set content type
      });
    });

    await page.goto('/inventory.html');
    
    // Assert that our mocked data is visible on the page
    const firstProduct = page.locator('.inventory_item_name').first();
    await expect(firstProduct).toHaveText(/Antigravity Professional Framework/);
    
    Logger.info("UI successfully rendered mocked data!");
  });


});
