import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://gridironsurvivor.com/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('testemail@email.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('test1234');
  await page.getByRole('button', { name: 'Continue' }).click();
});

test.describe('Login Page', () => {
  test.beforeAll(async ({ page }) => {
    await page.goto('https://gridironsurvivor.com/login');
    await expect(page).toHaveURL('https://gridironsurvivor.com/login');
  });

  test('Go to email input and input test email', async ({ page }) => {
    const locator = page.locator('input[type=email');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('testemail@email.com');
    await expect(locator).toHaveValue('testemail@.com');
  });
});
