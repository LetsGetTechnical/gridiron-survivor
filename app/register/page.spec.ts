// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { test, expect } from '@playwright/test';
import { deleteUser } from '@/api/serverApiFunctions';

const user = {
  confirmPassword: 'test12345',
  email: 'test0111@email.com',
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
});

test.describe('Tests register page', () => {
  test('should successfully register, direct users to weekly picks, and logout', async ({
    page,
  }) => {
    await page.getByTestId('email').fill(user.email);
    await page.getByTestId('password').fill(user.password);
    await page.getByTestId('confirm-password').fill(user.confirmPassword);
    await page.getByTestId('register-button').click();
    await page.waitForLoadState('load');
    await expect(page).toHaveURL('/league/all');
    await page.getByTestId('drawer-trigger').click();
    await page.getByTestId('sign-out-button').click();
    await expect(page).toHaveURL('/login');
    await deleteUser(user.id);
  });
  test('should not be able to register with invalid email and register button should be disabled', async ({
    page,
  }) => {
    await page.getByTestId('email').fill(user.invalidEmail);
    await page.getByTestId('password').fill(user.password);
    await page.getByTestId('confirm-password').fill(user.confirmPassword);
    await page.getByTestId('register-button').click();
    await expect(page).toHaveURL('/register');
  });
  test('should not be able to register with invalid password and register button should be disabled', async ({
    page,
  }) => {
    await page.getByTestId('email').fill(user.email);
    await page.getByTestId('password').fill(user.invalidPassword);
    await page.getByTestId('confirm-password').fill(user.confirmPassword);
    await expect(page.getByTestId('register-button')).toBeDisabled();
  });
  test('should not be able to register if confirm password recently got updated and register button should be disabled', async ({
    page,
  }) => {
    await page.getByTestId('email').fill(user.email);
    await page.getByTestId('password').fill(user.password);
    await page
      .getByTestId('confirm-password')
      .fill(user.invalidconfirmPassword);
    await expect(page.getByTestId('register-button')).toBeDisabled();
  });
});
