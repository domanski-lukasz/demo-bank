import test, { expect } from '@playwright/test';

test.describe('Dashboard tests', () => {
  
  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    const userName = 'usertest';
    const userPassword = 'testpass';
    
    await page.goto(url);
    await page.getByTestId('login-input').fill(userName);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
  });

  test('Simple transfer SUCCESSFUL - correct data', async ({ page }) => {
    // Arrangement
    const receiverID = '1';
    const transferAmount = '500';
    const transferTitle = 'przelew';

    // Actions
    await page.locator('#widget_1_transfer_receiver').selectOption(receiverID);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    // Asserts
    await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! Jan Demobankowy - ${transferAmount},00PLN - ${transferTitle}`);
  });

  test('Simple transfer UNSUCCESSFUL - empty fields', async ({ page }) => {
    // Arrangement
    const expectedMessage = 'pole wymagane';

    // Actions
    await page.getByRole('button', { name: 'wykonaj' }).click();

    // Asserts
    await expect(page.getByTestId('error-widget-1-transfer-receiver')).toHaveText(expectedMessage);
    await expect(page.getByTestId('error-widget-1-transfer-amount')).toHaveText(expectedMessage);
    await expect(page.getByTestId('error-widget-1-transfer-title')).toHaveText(expectedMessage);
  });

  test('Simple transfer UNSUCCESSFUL - receiver missing', async ({ page }) => {
    // Arrangement
    const expectedMessage = 'pole wymagane';

    // Actions
    await page.locator('#widget_1_transfer_amount').fill('400');
    await page.locator('#widget_1_transfer_title').fill('missing receiver');
    await page.getByRole('button', { name: 'wykonaj' }).click();

    // Asserts
    await expect(
      page.getByTestId('error-widget-1-transfer-receiver')).toHaveText(expectedMessage);
  });

  test('Simple transfer UNSUCCESSFUL - amount missing', async ({ page }) => {
    // Arrangement
    const optionSelect = '2';
    const transferTitle = 'missing amount';
    const expectedMessage = 'pole wymagane';

    // Actions
    await page.locator('#widget_1_transfer_receiver').selectOption(optionSelect);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.getByRole('button', { name: 'wykonaj' }).click();

    // Asserts
    await expect(page.getByTestId('error-widget-1-transfer-amount')).toHaveText(expectedMessage);
  });

  test('Simple transfer UNSUCCESSFUL - title missing', async ({ page }) => {
    // Arrangement
    const optionSelect = '1';
    const transferAmount = '400';
    const expectedMessage = 'pole wymagane';

    // Actions
    await page.locator('#widget_1_transfer_receiver').selectOption(optionSelect);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.getByRole('button', { name: 'wykonaj' }).click();

    // Asserts
    await expect(page.getByTestId('error-widget-1-transfer-title')).toHaveText(expectedMessage);
  });

  // MOBILE TOP-UP

  test('Simple mobile top-up SUCCESSFUL - correct data', async ({ page }) => {
    // Arrangement
    const optionSelect = '502 xxx xxx';
    const transferAmount = '45';

    // Actions
    await page.locator('#widget_1_topup_receiver').selectOption(optionSelect);
    await page.locator('#widget_1_topup_amount').fill(transferAmount);
    await page.locator('#uniform-widget_1_topup_agreement').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    // Asserts
    await expect(page.locator('#show_messages')).toHaveText(`Doładowanie wykonane! ${transferAmount},00PLN na numer ${optionSelect}`);
  });

  test('Simple mobile top-up UNSUCCESSFUL - empty fields', async ({ page }) => {
    // Arrangement
    const expectedMessage = 'pole wymagane';

    // Actions
    await page.getByRole('button', { name: 'doładuj telefon' }).click();

    // Asserts
    await expect(page.getByTestId('error-widget-1-topup-receiver')).toHaveText(expectedMessage);
    await expect(page.getByTestId('error-widget-1-topup-amount')).toHaveText(expectedMessage);
    await expect(page.getByTestId('error-widget-1-topup-agreement')).toHaveText(expectedMessage);
  });

  test('Simple mobile top-up UNSUCCESSFUL - option missing', async ({ page }) => {
    // Arrangement
    const topupAmount = '25';

    const expectedMessage = 'pole wymagane';

    // Actions
    await page.locator('#widget_1_topup_amount').fill(topupAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();

    // Asserts
    await expect(page.getByTestId('error-widget-1-topup-receiver')).toHaveText(expectedMessage);
  });

  test('Simple mobile top-up UNSUCCESSFUL - amount missing', async ({
    page,
  }) => {
    // Arrangement
    const optionSelect = '500 xxx xxx';

    const expectedMessage = 'pole wymagane';

    // Actions
    await page.locator('#widget_1_topup_receiver').selectOption(optionSelect);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();

    // Asserts
    await expect(page.getByTestId('error-widget-1-topup-amount')).toHaveText(expectedMessage);
  });

  test('Simple mobile top-up UNSUCCESSFUL - checkbox missing', async ({ page }) => {
    // Arrangement
    const optionSelect = '502 xxx xxx';
    const topupAmount = '25';

    const expectedMessage = 'pole wymagane';

    // Actions
    await page.locator('#widget_1_topup_receiver').selectOption(optionSelect);
    await page.locator('#widget_1_topup_amount').fill(topupAmount);
    await page.getByRole('button', { name: 'doładuj telefon' }).click();

    // Asserts
    await expect(page.getByTestId('error-widget-1-topup-agreement')).toHaveText(expectedMessage);
  });
});
