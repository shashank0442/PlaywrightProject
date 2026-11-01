const { expect } = require('@playwright/test');

exports.GiftCardPage = class GiftCardPage {

      /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.verifyWelcomeMessage = page.locator('body', { hasText: 'Welcome to our store' });
        this.giftCardTab= page.getByRole('link', { name: 'Gift Cards' }).first();
        this.giftCardHeader = page.locator('h1', { hasText: 'Gift Cards' });

    }

}