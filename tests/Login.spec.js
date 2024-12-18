import { test, expect } from '@playwright/test'
import { LoginPage } from '../Pages/loginPage';

test('Verify login functionality', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await expect(loginPage.returningCustomer,loginPage.returningCustomer+' is not displayed.').toBeVisible();
    await expect(loginPage.welcomeMessage,loginPage.welcomeMessage+' is not displayed.').toBeVisible();
    await loginPage.validateCategories();
    await loginPage.login('test.pass1@gmail.com','TestPass@123');
});