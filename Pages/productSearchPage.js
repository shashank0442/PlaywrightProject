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
        this.addToCartButtonOnProductDetailPage = page.locator('#add-to-cart-button-1')
    }
}