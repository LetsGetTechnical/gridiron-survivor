import { test, expect } from '@playwright/test';

const goodUser = {
  email: 'testemailt@email.com',
  password: 'test1234',
  confirmPassword: 'test1234',
};

const badUser = {
  email: 'wrongemail@email.com',
  password: 'wrongpassword',
  confirmPassword: 'wrongpassword1',
};

test.beforeEach(async ({ page }) => {
  await page.goto('/register');
});

//happy path
test.describe('Tests register page', () => {
  test('should successfully register', async ({ page }) => {
    await page.getByTestId('email').fill(goodUser.email);
    await page.getByTestId('password').fill(goodUser.password);
    await page.getByTestId('confirm-password').fill(goodUser.confirmPassword);
    await page.getByTestId('continue-button').click();
    await page.waitForURL('/weeklyPicks', { timeout: 500000 });
    await expect(page).toHaveURL('/weeklyPicks');
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
