import { test, expect } from '@playwright/test';
import { GiftCardPage } from '../Pages/GiftCardPage';

test('demowebshop gift cards page', async ({ page }) => {
  const giftCardPage = new GiftCardPage(page);

  await page.goto('https://demowebshop.tricentis.com/');  
  await giftCardPage.verifyWelcomeMessage.isVisible();
  await giftCardPage.giftCardTab.click();
  await expect(giftCardPage.giftCardHeader).toContainText('Gift Cards');
  
});