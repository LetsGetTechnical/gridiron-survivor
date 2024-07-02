// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { test, expect } from '@playwright/test';

const user = {
  confirmPassword: 'test12345',
  email: 'test032@email.com',
  id: '1234',
  incorrectEmail: 'test@email.com',
  incorrectPassword: 'test',
  invalidconfirmPassword: 'tester',
  invalidEmail: 'test',
  invalidPassword: 'tester',
  password: 'test12345',
};

test.beforeEach(async ({ page }) => {
  await page.goto('/register');

  await page.route('/api/register', (route, request) => {
    const postData = request.postData();
    if (postData !== null) {
      const parsedData = JSON.parse(postData);
      if (
        parsedData.email === user.email &&
        parsedData.password === user.password &&
        parsedData.confirmPassword === user.confirmPassword
      ) {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, redirectUrl: '/league/all' }),
        });
      } else {
        route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false,
            message: 'Invalid credentials',
          }),
        });
      }
    }
  });
});

test.describe('Tests register page', () => {
  test('should successfully register, direct users to league/all', async ({
    page,
  }) => {
    await page.getByTestId('email').fill(user.email);
    await page.getByTestId('password').fill(user.password);
    await page.getByTestId('confirm-password').fill(user.confirmPassword);
    await expect(page.getByTestId('continue-button')).toBeEnabled();
    await page.getByTestId('continue-button').click();
    await page.waitForLoadState('load', { timeout: 500000 });
    await expect(page).toHaveURL('/league/all');
  });

  test('should not be able to register with invalid email and register button should be disabled', async ({
    page,
  }) => {
    await page.getByTestId('email').fill(user.invalidEmail);
    await page.getByTestId('password').fill(user.password);
    await page.getByTestId('confirm-password').fill(user.confirmPassword);
    await page.getByTestId('continue-button').click();
    await expect(page).toHaveURL('/register');
  });

  test('should not be able to register with invalid password and register button should be disabled', async ({
    page,
  }) => {
    await page.getByTestId('email').fill(user.email);
    await page.getByTestId('password').fill(user.invalidPassword);
    await page.getByTestId('confirm-password').fill(user.confirmPassword);
    await expect(page.getByTestId('continue-button')).toBeDisabled();
  });

  test('should not be able to register if confirm password recently got updated and register button should be disabled', async ({
    page,
  }) => {
    await page.getByTestId('email').fill(user.email);
    await page.getByTestId('password').fill(user.password);
    await page
      .getByTestId('confirm-password')
      .fill(user.invalidconfirmPassword);
    await expect(page.getByTestId('continue-button')).toBeDisabled();
  });
});
