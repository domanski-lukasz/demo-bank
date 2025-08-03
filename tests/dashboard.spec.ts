import test, { expect } from '@playwright/test';

test.describe('Dashboard tests', () => {

  // SIMPLE TRANSFER

  test('Simple transfer SUCCESSFUL - correct data', async ({ page }) => {
    // login
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('dsadasda');
    await page.getByTestId('password-input').fill('dasdasda');
    await page.getByTestId('login-button').click();
    // transfer
    await page.locator('#widget_1_transfer_receiver').selectOption('1');
    await page.locator('#widget_1_transfer_amount').fill('500');
    await page.locator('#widget_1_transfer_title').fill('przelew');
    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Jan Demobankowy - 500,00PLN - przelew');
  });

  test('Simple transfer UNSUCCESSFUL - empty fields', async ({ page }) => {
    // login
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('dsadasda');
    await page.getByTestId('password-input').fill('dasdasda');
    await page.getByTestId('login-button').click();
    // transfer
    await page.getByRole('button', { name: 'wykonaj' }).click();

    await expect(page.getByTestId('error-widget-1-transfer-receiver')).toHaveText('pole wymagane');
    await expect(page.getByTestId('error-widget-1-transfer-amount')).toHaveText('pole wymagane');
    await expect(page.getByTestId('error-widget-1-transfer-title')).toHaveText('pole wymagane');
  });

  test('Simple transfer UNSUCCESSFUL - receiver missing', async ({ page }) => {
    // login
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('dsadasda');
    await page.getByTestId('password-input').fill('dasdasda');
    await page.getByTestId('login-button').click();
    // transfer
    await page.locator('#widget_1_transfer_amount').fill('400');
    await page.locator('#widget_1_transfer_title').fill('missing receiver');
    await page.getByRole('button', { name: 'wykonaj' }).click();

    await expect(page.getByTestId('error-widget-1-transfer-receiver')).toHaveText('pole wymagane');
  });

  test('Simple transfer UNSUCCESSFUL - ammount missing', async ({ page }) => {
    // login
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('dsadasda');
    await page.getByTestId('password-input').fill('dasdasda');
    await page.getByTestId('login-button').click();
    // transfer
    await page.locator('#widget_1_transfer_receiver').selectOption('2');
    await page.locator('#widget_1_transfer_title').fill('missing amount');
    await page.getByRole('button', { name: 'wykonaj' }).click();

    await expect(page.getByTestId('error-widget-1-transfer-amount')).toHaveText('pole wymagane');
  });

  test('Simple transfer UNSUCCESSFUL - title missing', async ({ page }) => {
    // login
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('dsadasda');
    await page.getByTestId('password-input').fill('dasdasda');
    await page.getByTestId('login-button').click();
    // transfer
    await page.locator('#widget_1_transfer_receiver').selectOption('1');
    await page.locator('#widget_1_transfer_amount').fill('400');
    await page.getByRole('button', { name: 'wykonaj' }).click();

    await expect(page.getByTestId('error-widget-1-transfer-title')).toHaveText('pole wymagane');
  });

  // MOBILE TOP-UP

  test('Simple mobile top-up SUCCESSFUL - correct data', async ({ page }) => {
    // login
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('dsadasda');
    await page.getByTestId('password-input').fill('dasdasda');
    await page.getByTestId('login-button').click();
    // top-up
    await page.locator('#widget_1_topup_receiver').selectOption('502 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('45');
    await page.locator('#uniform-widget_1_topup_agreement').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 45,00PLN na numer 502 xxx xxx');
  });

  test('Simple mobile top-up UNSUCCESSFUL - empty fields', async ({ page }) => {
    // login
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('dsadasda');
    await page.getByTestId('password-input').fill('dasdasda');
    await page.getByTestId('login-button').click();
    // top-up
    await page.getByRole('button', { name: 'doładuj telefon' }).click();

    await expect(page.getByTestId('error-widget-1-topup-receiver')).toHaveText('pole wymagane');
    await expect(page.getByTestId('error-widget-1-topup-amount')).toHaveText('pole wymagane');
    await expect(page.getByTestId('error-widget-1-topup-agreement')).toHaveText('pole wymagane');
  });

  test('Simple mobile top-up UNSUCCESSFUL - option missing', async ({ page }) => {
    // login
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('dsadasda');
    await page.getByTestId('password-input').fill('dasdasda');
    await page.getByTestId('login-button').click();
    // top-up
    await page.locator('#widget_1_topup_amount').fill('25');
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();

    await expect(page.getByTestId('error-widget-1-topup-receiver')).toHaveText('pole wymagane');
  });

  test('Simple mobile top-up UNSUCCESSFUL - amount missing', async ({ page }) => {
    // login
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('dsadasda');
    await page.getByTestId('password-input').fill('dasdasda');
    await page.getByTestId('login-button').click();
    // top-up
    await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();

    await expect(page.getByTestId('error-widget-1-topup-amount')).toHaveText('pole wymagane');
  });

  test('Simple mobile top-up UNSUCCESSFUL - checkbox missing', async ({ page }) => {
    // login
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('dsadasda');
    await page.getByTestId('password-input').fill('dasdasda');
    await page.getByTestId('login-button').click();
    // top-up
    await page.locator('#widget_1_topup_receiver').selectOption('502 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('45');
    await page.getByRole('button', { name: 'doładuj telefon' }).click();

    await expect(page.getByTestId('error-widget-1-topup-agreement')).toHaveText('pole wymagane');
  });

});