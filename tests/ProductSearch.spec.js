import { test, expect } from '@playwright/test';
import { ProductSearchPage } from "../Pages/productSearchPage";
import { LoginPage } from '../Pages/loginPage';
import { log } from 'console';

test('Verify login functionality', async ({ page }) => {
    let username = 'test.pass1@gmail.com';
    let password = 'TestPass@123';
    let firstName = 'test';
    let lastName = 'pass1';
    let redeemText = '$5 Gift Card. Gift Cards must be redeemed through our site Web site toward the purchase of eligible products.';
    let recipientName = 'Ron';
    let recipientEmail = 'ron@gmail.com';

    const loginPage = new LoginPage(page);
    const productSearchPage = new ProductSearchPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(username, password);


    //-------------------------Need to run again ------------------------------

    if (!await page.getByText('No addresses').isVisible()) {
        await page.goto("https://demowebshop.tricentis.com/customer/addresses");
        while (!await page.getByText('No addresses').isVisible()) {
            await page.getByRole('button', { name: 'Delete' }).click();
            page.on('dialog', dialog => dialog.accept());
        }
    }
    //-------------------------------------------------------------------------

    //await productSearchPage.removeExistingAddress();



    await productSearchPage.giftCardMenuButton.click();

    // Home / Gift Cards Screen - Checking details on GiftCard Screen
    await expect(productSearchPage.giftCardHeader).toContainText('Gift Cards');
    await expect(productSearchPage.giftCardName).toBeVisible();
    await productSearchPage.addToCartButton.click();

    //Home / Gift Cards / $5 Virtual Gift Card
    await expect(productSearchPage.redeemMessage).toContainText(redeemText);
    await productSearchPage.recipientNameLocator.fill(recipientName);
    await productSearchPage.recipientEmailLocator.fill(recipientEmail);

    await page.getByRole('input', { value: firstName + " " + lastName }).isVisible();
    await page.getByRole('input', { value: username }).isVisible();
    await expect(productSearchPage.singleProductCostLocator).toContainText('5.00');
    await productSearchPage.productQuantity.fill('2');
    await productSearchPage.addToCartButtonOnProductDetailPage.click();

    //add to cart
    await productSearchPage.addToCartButtonLocator.click();
    let itemQuantity = await productSearchPage.itemQuantityLocator.getAttribute('value');
    console.log("itemQuantity == " + itemQuantity);

    if (!itemQuantity == 2) {
        await productSearchPage.itemQuantityLocator.fill('2');
        await productSearchPage.updateShoppingCart.click();
    }

    await productSearchPage.termsLocator.check();
    await productSearchPage.checkoutButton.click();

    let prepopulatedValues = [firstName, lastName, username];
    for (let i = 0; i < prepopulatedValues.length; i++) {
        await page.getByRole('input', { value: prepopulatedValues[i] }).isVisible();
    }

    //Validating Error message on the page.
    await productSearchPage.continueButtonOnBillingAddress.click();
    await productSearchPage.validateBillingAddressErrorMessage();

    await page.getByLabel('Country:').selectOption('41');

    await productSearchPage.fillFormValues();

    await productSearchPage.continueButtonOnBillingAddress.click();
    await expect(page.locator('#opc-payment_method')).toContainText('Payment method');

    await expect(page.locator('#checkout-payment-method-load')).toContainText('Cash On Delivery (COD) (7.00)');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.pause();
    await page.locator('#payment-info-buttons-container').click();
    await expect(page.locator('#opc-payment_info')).toContainText('Payment information');
    await expect(page.getByRole('cell')).toContainText('You will pay by COD');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.locator('#checkout-confirm-order-load li').filter({ hasText: 'Billing Address' }).click();
    await expect(page.locator('#checkout-confirm-order-load')).toContainText('Billing Address');
   // await expect(page.locator('#checkout-confirm-order-load')).toContainText('Billing Address test pass Email: test.pass1@gmail.com Phone: 9876543210 Fax: 9876987699 ABC Private LTD a b Pune , 111111 India Payment Method Cash On Delivery (COD)');
    await expect(page.getByText('10.00').nth(1)).toBeVisible();
    await expect(page.locator('#checkout-confirm-order-load')).toContainText('10.00');
    await expect(page.locator('#checkout-confirm-order-load')).toContainText('17.00');
    await page.getByRole('button', { name: 'Confirm' }).click();
    await expect(page.locator('h1')).toContainText('Thank you');
    await page.getByText('Your order has been successfully processed! Order number: 1824207 Click here').click();
    await expect(page.locator('body')).toContainText('Your order has been successfully processed!');
    await expect(page.locator('body')).toContainText('Order number: 1824207');
    await expect(page.locator('body')).toContainText('Click here for order details.');
    await page.getByText('Your order has been successfully processed! Order number: 1824207 Click here').click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await loginPage.welcomeMessage.isVisible();
});