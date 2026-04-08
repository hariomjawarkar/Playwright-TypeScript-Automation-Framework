import { test, expect } from '../fixtures/baseTest';
import { ENV } from '../config/env';

test.use({ storageState: { cookies: [], origins: [] } });

test('API + UI Product Validation', async ({ request, loginPage, page }) => {

  // Step 1: Execute API Request using dynamic apiUrl from config
  const response = await request.get(`${ENV.apiUrl}/products/1`);

  // Step 2: Validate API Response - This is Playwright best practice
  await expect(response).toBeOK();

  // Step 3: Parse and Log data
  const product = await response.json();
  console.log(`Debug - Product Title: ${product.title}`);

  // Enhancement: Schema Validation (Ensuring product structure is correct)
  expect(product).toMatchObject({
    id: expect.any(Number),
    title: expect.any(String),
    price: expect.any(Number),
    description: expect.any(String)
  });

  // Step 4: UI Validation
  await loginPage.login("standard_user", "secret_sauce");

  // Example of using API data in UI validation (if relevant)
  // await expect(page.locator('.inventory_item_name').first()).toContainText(product.title);
  await expect(page.locator('.title')).toHaveText("Products");
});
