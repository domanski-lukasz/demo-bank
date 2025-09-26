import { test, expect } from '@playwright/test';

test.describe('User login', () => {
  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url);
  });

  test('SUCCESSFUL login with correct credentials', async ({ page }) => {
    // Arrangement
    const userName = 'usertest';
    const userPassword = 'testpass';
    const expectedUserName = 'Jan Demobankowy';

    // Actions
    await page.getByTestId('login-input').fill(userName);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.getByTestId('user-name').click();

    // Assserts
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('UNSUCCESSFUL login with incorrect credentials - incorrect username(less than 8 chars)', async ({
    page,
  }) => {
    // Arrangement
    const expectedMessage = 'identyfikator ma min. 8 znaków';

    // Actions
    await page.getByTestId('login-input').fill('user');
    await page.getByTestId('password-input').click();

    // Assserts
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedMessage,
    );
  });

  test('UNSUCCESSFUL login with incorrect credentials - incorrect password(less than 8 chars)', async ({
    page,
  }) => {
    // Arrangement
    const userName = 'usertest';
    const expectedMessage = 'hasło ma min. 8 znaków';

    // Actions
    await page.getByTestId('login-input').fill(userName);
    await page.getByTestId('password-input').fill('pass');
    await page.getByTestId('password-input').blur();

    // Assserts
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedMessage,
    );
  });
});
