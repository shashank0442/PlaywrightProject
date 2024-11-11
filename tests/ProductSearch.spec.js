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
    await productSearchPage.removeExistingAddress();

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

    page.pause();
    await productSearchPage.itemQuantityLocator.fill('2');
    await productSearchPage.updateShoppingCart.click();

    await productSearchPage.termsLocator.check();
    await productSearchPage.checkoutButton.click();

    let prepopulatedValues = [firstName, lastName, username];
    for (let i = 0; i < prepopulatedValues.length; i++) {
        await page.getByRole('input', { value: prepopulatedValues[i] }).isVisible();
    }

    //Validating Error message on the page.
    await productSearchPage.continueButton.click();
    await productSearchPage.validateBillingAddressErrorMessage();

    await productSearchPage.countryLocator.selectOption('41');

    await productSearchPage.fillFormValues();

    await productSearchPage.continueButton.click();

    await expect(productSearchPage.paymentMethod).toContainText('Payment method');
    await expect(productSearchPage.codOption).toContainText('Cash On Delivery (COD) (7.00)');
    await productSearchPage.continueButton.click();

    await page.pause();
    await productSearchPage.paymentMethodContinueButton.click();
    await expect(productSearchPage.paymentInformationHeading).toContainText('Payment information');
    await expect(productSearchPage.codMessage).toContainText('You will pay by COD');
    await productSearchPage.continueButton.click();
    await expect(productSearchPage.billingDetails).toContainText('Billing Address');

    //Checking Subtotal
    await expect(productSearchPage.billingDetails).toContainText('10.00');
    //Checking total
    await expect(productSearchPage.billingDetails).toContainText('17.00');

    await productSearchPage.confirmOrderButton.click();
    await expect(productSearchPage.thankYouMessage).toContainText('Thank you');

    await expect(productSearchPage.orderConfirmationDetails).toContainText('Your order has been successfully processed!');
    await expect(productSearchPage.orderConfirmationDetails).toContainText('Click here for order details.');
    await productSearchPage.continueButton.click();

    await loginPage.welcomeMessage.isVisible();
});