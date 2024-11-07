import { test, expect } from '@playwright/test';
import { ProductSearchPage } from "../Pages/productSearchPage";
import { LoginPage } from '../Pages/loginPage';

test('Verify login functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productSearchPage = new ProductSearchPage(page);
    await loginPage.openLoginPage();
    await loginPage.login('test.pass1@gmail.com','TestPass@123');

    await page.pause();
    await productSearchPage.giftCardMenuButton.click();
    await expect(page.locator('h1')).toContainText('Gift Cards');
    await expect(page.locator('body')).toContainText('$5 Virtual Gift Card');
    await expect(page.locator('body')).toContainText('5.00');
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(page.locator('body')).toContainText('$5 Virtual Gift Card');
    await expect(page.locator('#product-details-form')).toContainText('$5 Gift Card. Gift Cards must be redeemed through our site Web site toward the purchase of eligible products.');
    
    await page.getByLabel('Recipient\'s Name:').fill('Ram');
    await page.getByLabel('Recipient\'s Email:').fill('Ram@gmail.com');
    await expect(page.locator('#product-details-form')).toContainText('5.00');

    await productSearchPage.productQuantity.fill('2');
    await productSearchPage.addToCartButtonOnProductDetailPage.click();
    await page.getByRole('link', { name: 'Shopping cart (2)' }).click();
    await expect(page.locator('body')).toContainText('10.00');
    await page.locator('#termsofservice').check();
    await expect(page.locator('body')).toContainText('I agree with the terms of service and I adhere to them unconditionally (read)');
    await page.getByRole('button', { name: 'Checkout' }).click();
});