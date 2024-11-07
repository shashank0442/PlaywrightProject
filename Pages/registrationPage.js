const { expect } = require('@playwright/test');

exports.RegistrationPage = class RegistrationPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.pageTtitle = page.locator('title', { hasText: 'Demo Web Shop' });

        this.registrationLink = page.getByRole('link', { name: 'Register' });
        this.registrationSubmitButton = page.getByRole('button', { name: 'Register' });

        this.passwordErrorMessage = page.getByText('Password is required.');

        this.gender = page.getByLabel('Male', { exact: true });

        this.firstName = page.locator('#FirstName');
        this.lastName = page.locator('#LastName');
        
        this.email = page.getByLabel('Email:');
        
        this.password = page.locator("[name='Password']");
        this.confirmPassword = page.locator("[name='ConfirmPassword']");

        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.logoutButton = page.getByRole('link', { name: 'Log out' });

    }

    async openDemowebshop() {
        await this.page.goto('https://demowebshop.tricentis.com/');
    }
};