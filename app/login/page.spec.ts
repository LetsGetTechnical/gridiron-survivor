import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/login');

  await page.getByTestId('email').click();
  await page.getByTestId('email').fill('testemail@email.com');

  await page.getByTestId('password').click();
  await page.getByTestId('password').fill('test1234');

  await page.getByTestId('continue-button').click();

  await expect(page).toHaveURL('/weeklyPicks');

  const urlAfterLogin = await page.url();
  console.log(urlAfterLogin);
  if (urlAfterLogin === '/weeklyPicks') {
    console.log('Successful login');
  } else {
    console.log('Failed to login');
  }
});
