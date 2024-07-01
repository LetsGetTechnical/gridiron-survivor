// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

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

    // Mock the login API request
    await page.route('/api/login', (route, request) => {
      const postData = request.postData();
      if (postData !== null) {
        const parsedData = JSON.parse(postData);
        if (
          parsedData.email === correctCredentials.email &&
          parsedData.password === correctCredentials.password
        ) {
          route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ success: true, redirectUrl: '/league/all' }),
          });
        } else {
          route.fulfill({
            status: 401,
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

  test('should successfully login', async ({ page }) => {
    await page.getByTestId('email').fill(correctCredentials.email);
    await page.getByTestId('password').fill(correctCredentials.password);
    await page.getByTestId('continue-button').click();
    await page.waitForLoadState('load');
    await expect(page).toHaveURL('/league/all');
  });

  test('should fail login', async ({ page }) => {
    await page.getByTestId('email').fill(incorrectCredentials.email);
    await page.getByTestId('password').fill(incorrectCredentials.password);
    await page.getByTestId('continue-button').click();
    await expect(page).toHaveURL('/login');
  });
});
