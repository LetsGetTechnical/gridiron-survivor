import { test, expect } from '@playwright/test';
test('should successfully login', async ({ page }) => {
  await page.goto('/login');
  await page.getByTestId('email').click();
  await page.getByTestId('email').fill('testemail@email.com');
  await page.getByTestId('password').click();
  await page.getByTestId('password').fill('test1234');
  await page.getByTestId('continue-button').click();
  await expect(page).toHaveURL('/weeklyPicks');
});
test('should fail login', async ({ page }) => {
  await page.goto('/login');
  await page.getByTestId('email').click();
  await page.getByTestId('email').fill('wrongemail@email.com');
  await page.getByTestId('password').click();
  await page.getByTestId('password').fill('wrongpassword');
  await page.getByTestId('continue-button').click();
  await expect(page).toHaveURL('/login');
});
