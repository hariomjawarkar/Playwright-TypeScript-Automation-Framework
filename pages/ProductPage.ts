import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {

    readonly page: Page;
    readonly productTitle: Locator;
    readonly addBackpackBtn: Locator;
    readonly cartIcon: Locator;
    readonly menuBtn: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page){

        this.page = page;

        this.productTitle = page.locator('.title');
        this.addBackpackBtn = page.locator('#add-to-cart-sauce-labs-backpack');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.menuBtn = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');

    }

    async verifyProductPage(){

        await expect(this.productTitle).toHaveText('Products');

    }

    async addProductToCart(){
        await this.addBackpackBtn.click();
        // Wait for the badge to be visible before proceeding - solves headed race conditions
        await this.page.locator('.shopping_cart_badge').waitFor({ state: 'visible' });
    }

    async openCart() {
        // Wait for stability: the cart icon is re-rendered when the badge appears
        await this.page.locator('.shopping_cart_link').waitFor({ state: 'visible' });
        await this.cartIcon.click();
    }

    async logout(){

        await this.menuBtn.click();

        // Wait for the sidebar menu to expand and the logout link to be visible
        await this.logoutLink.waitFor({ state: 'visible', timeout: 5000 });

        await this.logoutLink.click();

    }

}