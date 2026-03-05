import { test, expect } from '../fixtures/baseTest';

test.beforeEach(async ({ loginPage }) => {

 console.log("Starting Test");

 await loginPage.login("standard_user","secret_sauce");

});

test.afterEach(async ({ page }) => {

 console.log("Test Finished");

 await page.waitForTimeout(1000);

});

test('Add Product To Cart @smoke', async ({ productPage, cartPage }) => {

 await productPage.verifyProductPage();

 await productPage.addProductToCart();

 await productPage.openCart();

 await cartPage.verifyProductInCart("Sauce Labs Backpack");

});