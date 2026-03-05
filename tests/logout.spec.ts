import { test, expect } from '../fixtures/baseTest';

test('Logout Test @regression', async ({ loginPage, productPage, page }) => {

    await loginPage.login("standard_user","secret_sauce");

    await productPage.verifyProductPage();

    await productPage.logout();

    await expect(page).toHaveURL("https://www.saucedemo.com/");

});