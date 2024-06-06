import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('link', { name: 'Sign up to get started with a' }).click();
  await page.getByTestId('email').click();
  await page.getByTestId('email').fill('testrawr@rawr.com');
  await page.getByTestId('email').press('Tab');
  await page.getByTestId('password').fill('test1234');
  await page.getByTestId('password').press('Tab');
  await page.getByTestId('confirm-password').fill('test1234');
  await page.getByTestId('continue-button').click();
  await page.goto('http://localhost:3000/weeklyPicks');
  await page.goto('http://localhost:3000/weeklyPicks');
  await page.getByTestId('nav').click();
 
});