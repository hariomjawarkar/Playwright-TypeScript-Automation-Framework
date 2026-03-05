import { Page, Locator, expect } from '@playwright/test';

export class CartPage {

    readonly page: Page;
    readonly cartItem: Locator;

    constructor(page: Page){

        this.page = page;

        this.cartItem = page.locator('.inventory_item_name');

    }

    async verifyProductInCart(productName:string){

        await expect(this.cartItem).toContainText(productName);

    }

}