import { test, expect } from '@playwright/test';

test.describe('User login', () => {

  test('SUCCESSFUL login with correct credentials', async ({ page }) => {
    // Consts arrangement
    const url = 'https://demo-bank.vercel.app/';
    const userName = 'usertest';
    const userPassword = 'ssssssss';
    const expectedUserName = 'Jan Demobankowy';

    // Actions
    await page.goto(url);
    await page.getByTestId('login-input').fill(userName);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.getByTestId('user-name').click();

    // Assserts
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('UNSUCCESSFUL login with incorrect credentials - incorrect username', async ({ page }) => {
     // Consts arrangement
    const url = 'https://demo-bank.vercel.app/';
    
    // Actions
    await page.goto(url);
    await page.getByTestId('login-input').fill('user');
    await page.getByTestId('password-input').click();

    // Assserts
    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
  });

  test('UNSUCCESSFUL login with incorrect credentials - incorrect password(less than 8 chars)', async ({ page }) => {
    // Consts arrangement
    const url = 'https://demo-bank.vercel.app/';
    
    // Actions
    await page.goto(url);
    await page.getByTestId('login-input').fill('usertest');
    await page.getByTestId('password-input').fill('ssss');
    await page.getByTestId('password-input').blur();

    // Assserts
    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  });

});