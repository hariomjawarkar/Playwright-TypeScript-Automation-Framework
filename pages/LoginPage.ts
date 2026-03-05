import { Page, Locator } from '@playwright/test';
import { ENV } from '../config/env';

export class LoginPage {

    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page){

        this.page = page;

        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
    }

    async navigateToLogin(){

        await this.page.goto(ENV.dev.baseURL);

    }

    async login(user:string, pass:string){

        if(!user || !pass){
            throw new Error("Username or Password is undefined. Check Excel data.");
        }

        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginBtn.click();

    }

}