import { test, expect } from '../fixtures/baseTest';

test('Valid Login Test @smoke', async ({ loginPage, page }) => {

    const username = "standard_user";
    const password = "secret_sauce";

    await loginPage.login(username, password);

    await expect(page).toHaveURL(/inventory/);

});