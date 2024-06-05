import { test, expect } from '@playwright/test';

const user = {
  confirmPassword: 'test12345',
  email: 'test1@email.com',
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
  test('should successfully register and direct users to weekly picks', async ({
    page,
  }) => {
    await page.getByTestId('email').fill(user.email);
    await page.getByTestId('password').fill(user.password);
    await page.getByTestId('confirm-password').fill(user.confirmPassword);
    await page.getByTestId('continue-button').click();
    await page.goto('/weeklyPicks');
    await expect(page).toHaveURL('/weeklyPicks');
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
