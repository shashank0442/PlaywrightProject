import { test, expect } from '@playwright/test'
import { RegistrationPage } from '../Pages/registrationPage';

test('Verify registration functionality', async ({ page }) => {

    const registrationPage = new RegistrationPage(page);
    await registrationPage.openDemowebshop();
    await registrationPage.pageTtitle.isVisible();
    await registrationPage.registrationLink.click();

    // Clicking on Submit button without entering any value to check error message
    await registrationPage.registrationSubmitButton.click();
    
    // Validating error message
    let errorMessage = ["First name is required.", "Last name is required.", "Email is required."]
    for (let i = 0; i < errorMessage.length; i++) {
        await expect(page.getByText(errorMessage[i]), +errorMessage[i] + ' is not displayed').toBeVisible();
    }

    await expect(registrationPage.passwordErrorMessage, 'Password error message not displayed twice').toHaveCount(2);
    registrationPage.gender.check();
    await registrationPage.firstName.fill('test');
    await registrationPage.lastName.fill('pass');

    // Entering correct email
    await registrationPage.email.fill('test.pass@gmail.com');

    // Entering password
    await registrationPage.password.fill('TestPass@123');
    await registrationPage.confirmPassword.fill('TestPass@123');
    await registrationPage.registrationSubmitButton.click();
    await registrationPage.continueButton.click();
    await registrationPage.logoutButton.click();
});