const { expect } = require('@playwright/test');

exports.ProductSearchPage = class ProductSearchPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.giftCardMenuButton = page.getByRole('link', { name: 'Gift Cards' }).first();
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' }).first();
        this.productQuantity = page.getByLabel('Qty:');

        this.giftCardHeader = page.locator('h1');
        this.giftCardName = page.getByRole('link', { name: '$5 Virtual Gift Card', exact: true });
        this.redeemMessage = page.locator('#product-details-form');

        this.recipientNameLocator = page.getByLabel('Recipient\'s Name:');
        this.recipientEmailLocator = page.getByLabel('Recipient\'s Email:');
        this.singleProductCostLocator = page.locator('#product-details-form');
        this.addToCartButtonLocator = page.locator('#topcartlink a span.cart-label');
        this.itemQuantityLocator = page.locator('input[name="itemquantity4710008"]');
        this.updateShoppingCart = page.getByRole('button', { name: 'Update shopping cart' })
        this.termsLocator = page.locator('#termsofservice');

        this.addToCartButtonOnProductDetailPage = page.locator('#add-to-cart-button-1');
        this.continueButtonOnBillingAddress = page.getByRole('button', { name: 'Continue' });

        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });

    }

    async validateBillingAddressErrorMessage() {
        let errorMessage = ["Country is required.", "City is required", "Street address is required", "Zip / postal code is required", "Phone is required"];
        for (let i = 0; i < errorMessage.length; i++) {
            await expect(this.page.locator('#billing-new-address-form')).toContainText(errorMessage[i]);
        }
    }

    async fillFormValues() {
        let formLabels = ["Company:", "City:", "Address 1:", "Address 2:", "Zip / postal code:", "Phone number:", "Fax number:"];
        let formValues = ["ABC Private LTD", "Pune", "abc line", "Xyz Colony", "4433322", "9876543210", "9876987699"];

        for (let i = 0; i < formLabels.length; i++) {
            for (let j = i; j <= i; j++) {
                await this.page.getByLabel(formLabels[i]).fill(formValues[j]);
                console.log(formLabels[i] + "  " + formValues[j])
            }
        }
    }

    async removeExistingAddress() {
        await this.page.goto("https://demowebshop.tricentis.com/customer/addresses");
        await this.page.getByRole('button', { name: 'Delete' }).click();
            this.page.once('dialog', dialog => {
                console.log(`Dialog message: ${dialog.message()}`);
                dialog.accept();
            });
        this.page.on('dialog', dialog => dialog.accept());
        await page.getByRole('OK').click();
    }

}