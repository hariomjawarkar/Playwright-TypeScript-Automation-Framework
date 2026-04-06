import { test, expect } from '../fixtures/baseTest';
import { Logger } from '../utils/Logger';

test.describe('Network Interception & Mocking @mocking', () => {

  test('Should handle API Server Error (500) gracefully', async ({ page }) => {
    Logger.info("Mocking internal server error (500) for products API...");

    // We block the inventory request to simulate a real server failure
    await page.route('**/inventory.html', async route => {
      Logger.info("Intercepted network request! Mocking 500 Failure.");
      await route.fulfill({
        status: 500,
        contentType: 'text/html',
        body: '<h1>Internal Server Error</h1>'
      });
    });

    await page.goto('/inventory.html');
    
    // In a 500 scenario, our 'Products' title locator shouldn't be found or should show error
    const title = page.locator('.title');
    await expect(title).not.toBeVisible();
    
    Logger.info("Negative test for API error handling passed.");
  });

  test('Mocking a custom product name in UI', async ({ page }) => {
    Logger.info("Mocking dynamic text via route interception of JS bundles...");
    
    // We must intercept the JS files because SauceDemo is a React app 
    // that renders product names from internal bundles, not static HTML.
    await page.route('**/*main*.js', async route => {
      Logger.info("Success! Intercepted the product data bundle.");
      const response = await route.fetch();
      let bodyData = await response.text();
      
      // We globally replace the product name string inside the JS logic
      const searchTerm = 'Sauce Labs Backpack';
      const replacementTerm = 'Antigravity Professional Framework';
      
      if (bodyData.includes(searchTerm)) {
        bodyData = bodyData.split(searchTerm).join(replacementTerm);
        Logger.info(`Replaced "${searchTerm}" with "${replacementTerm}" in JS bundle.`);
      } else {
        Logger.warn(`Warning: "${searchTerm}" not found in intercepted JS bundle.`);
      }
      
      const responseHeaders = response.headers();
      delete responseHeaders['content-encoding'];
      delete responseHeaders['content-length'];

      await route.fulfill({
        status: response.status(),
        headers: responseHeaders,
        body: bodyData,
        contentType: 'application/javascript'
      });
    });

    await page.goto('/inventory.html', { waitUntil: 'networkidle' });
    
    // Validate that the hot-patched JS rendered the custom name onto the UI with retries/wait
    const firstProduct = page.locator('.inventory_item_name').first();
    await expect(firstProduct).toHaveText(/Antigravity Professional Framework/i, { timeout: 10000 });
    
    Logger.info("UI successfully rendered mocked data from JS bundle!");
  });


});
