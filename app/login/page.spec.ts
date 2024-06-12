import { test, expect } from '@playwright/test';

const correctCredentials = {
  email: 'testemail@email.com',
  password: 'test1234',
};
const incorrectCredentials = {
  email: 'wrongemail@email.com',
  password: 'wrongpassword',
};

test.describe('Tests login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should successfully login', async ({ page }) => {
    await page.getByTestId('email').fill(correctCredentials.email);
    await page.getByTestId('password').fill(correctCredentials.password);
    await page.getByTestId('continue-button').click();
    await expect(page).toHaveURL('/weeklyPicks');
  });

  test('should fail login', async ({ page }) => {
    await page.getByTestId('email').fill(incorrectCredentials.email);
    await page.getByTestId('password').fill(incorrectCredentials.password);
    await page.getByTestId('continue-button').click();
    await expect(page).toHaveURL('/login');
  });
});
