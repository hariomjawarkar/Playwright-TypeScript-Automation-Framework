import { test, expect } from '../fixtures/baseTest';
import { Logger } from '../utils/Logger';

test.beforeEach(async ({ page }) => {
  Logger.info("Navigating to inventory page with authenticated state...");
  await page.goto('/inventory.html', { waitUntil: 'domcontentloaded' });
  await page.locator('.inventory_list').waitFor({ state: 'visible' });
});

test('Add Product To Cart @smoke', async ({ productPage, cartPage }) => {
  Logger.info("Starting product selection flow...");
  await productPage.verifyProductPage();
  await productPage.addProductToCart();
  await productPage.openCart();
  await cartPage.verifyProductInCart("Sauce Labs Backpack");
});