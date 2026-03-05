import { test } from '../fixtures/baseTest';

test('Complete Checkout Flow @regression', async ({ loginPage, productPage, cartPage, checkoutPage }) => {

    const username = "standard_user";
    const password = "secret_sauce";

    await loginPage.login(username,password);

    await productPage.verifyProductPage();

    await productPage.addProductToCart();

    await productPage.openCart();

    await cartPage.verifyProductInCart("Sauce Labs Backpack");

    await checkoutPage.clickCheckout();

    await checkoutPage.enterCheckoutDetails("Hariom","Jawarkar","411001");

    await checkoutPage.finishOrder();

    await checkoutPage.verifyOrderConfirmation();

});