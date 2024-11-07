const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.welcomeMessage = page.getByRole('heading', { name: 'Welcome, Please Sign In!' });
        this.email = 'testa.passa@gmail.com';
        this.pass = 'TestPass@123a';
        this.enterEmail = page.getByLabel('Email:');
        this.enterPassword = page.getByLabel('Password:');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.returningCustomer = page.getByText('Returning Customer')
    }

    async openLoginPage() {
        await this.page.goto('https://demowebshop.tricentis.com/login');
    }

    async validateCategories() {
        let isPresent = false;
        let categories = ["Books", "Computers", "Electronics", "Apparel & Shoes",
            "Digital downloads", "Jewelry", "Gift Cards"];
        for (let i = 0; i < categories.length; i++) {
            isPresent = await expect(this.page
                .getByRole('listitem')
                .filter({ has: this.page.getByRole('link', 
                    { name: categories[i] }) }),categories[i]+'is not present').toHaveCount(2);
        }
    }

    async login( userEmail, password){
        await this.enterEmail.fill(userEmail);
        await this.enterPassword.fill(password);
        await this.loginButton.click();
    }
};