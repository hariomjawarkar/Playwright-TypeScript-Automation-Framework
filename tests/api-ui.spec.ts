import { test, expect } from '../fixtures/baseTest';

test('API + UI Product Validation', async ({ request, loginPage, page }) => {

 const response = await request.get('https://fakestoreapi.com/products/1');

 const product = await response.json();

 console.log(product.title);

 await loginPage.login("standard_user","secret_sauce");

 await expect(page.locator('.title')).toHaveText("Products");
});