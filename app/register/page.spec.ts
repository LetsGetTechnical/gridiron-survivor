import { test, expect } from '@playwright/test';

const goodUser = {
  email: 'test1@email.com',
  password: 'test12345',
  confirmPassword: 'test12345',
};

const badUser = {
  email: 'wrongemail@email.com',
  password: 'wrongpassword',
  confirmPassword: 'wrongpassword1',
};

test.beforeEach(async ({ page }) => {
  await page.goto('/register');
});

test.describe('Tests register page', () => {
  test('should successfully register', async ({ page }) => {
    await page.getByTestId('email').fill(goodUser.email);
    await page.getByTestId('password').fill(goodUser.password);
    await page.getByTestId('confirm-password').fill(goodUser.confirmPassword);
    await page.getByTestId('continue-button').click();
    await page.goto('http://localhost:3000/weeklyPicks');
    await expect(page.url()).toBe('http://localhost:3000/weeklyPicks');
  });
  test('should not be able to register and register button should be disabled', async ({
    page,
  }) => {
    await page.getByTestId('email').fill(badUser.email);
    await page.getByTestId('password').fill(badUser.password);
    await page.getByTestId('confirm-password').fill(badUser.confirmPassword);
    const isDisabled = await page.getByTestId('continue-button').isDisabled();
    expect(isDisabled).toBe(true);
    await expect(page).toHaveURL('/register');
  });
});
