import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {

    readonly page: Page;
    readonly checkoutBtn: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueBtn: Locator;
    readonly finishBtn: Locator;
    readonly orderConfirmation: Locator;

    constructor(page: Page){

        this.page = page;

        this.checkoutBtn = page.locator('#checkout');
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueBtn = page.locator('#continue');
        this.finishBtn = page.locator('#finish');
        this.orderConfirmation = page.locator('.complete-header');
    }

    async clickCheckout(){

        await this.checkoutBtn.click();

    }

    async enterCheckoutDetails(first:string,last:string,zip:string){

        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postalCode.fill(zip);
        await this.continueBtn.click();

    }

    async finishOrder(){

        await this.finishBtn.click();

    }

    async verifyOrderConfirmation(){

        await expect(this.orderConfirmation).toHaveText("Thank you for your order!");

    }

}