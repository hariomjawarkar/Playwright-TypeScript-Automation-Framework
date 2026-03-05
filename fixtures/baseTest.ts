import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

type MyFixtures = {
 loginPage: LoginPage;
 productPage: ProductPage;
 cartPage: CartPage;
 checkoutPage: CheckoutPage;
};

export const test = base.extend<MyFixtures>({

 loginPage: async ({ page }, use) => {

  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
  await use(loginPage);

 },

 productPage: async ({ page }, use) => {

  const productPage = new ProductPage(page);
  await use(productPage);

 },

 cartPage: async ({ page }, use) => {

  const cartPage = new CartPage(page);
  await use(cartPage);

 },

 checkoutPage: async ({ page }, use) => {

  const checkoutPage = new CheckoutPage(page);
  await use(checkoutPage);

 }

});

export { expect } from '@playwright/test';