import { test, expect } from '@playwright/test';

const goodUser = {
    email: 'test1234@email.com',
    password: 'test1234',
    confirmPassword: 'test1234',
};

const badUser = {
    email: 'wronguser@email.com',
    password: 'test1234',
    confirmPassword: 'test12345',
};

test.beforeEach(async ({ page }) => {
    await page.goto('/register');
});

test.describe('Tests register page', () => {
    test('should successfully register', async ({ page }) => {
        await page.getByTestId('email').fill(goodUser.email);
        await page.getByTestId('password').fill(goodUser.password);
        await page.getByTestId('confirm-password').fill(goodUser.confirmPassword);
        await page.getByTestId('register-button').click();
        await expect(page).toHaveURL('/weeklyPicks');
    });
    test('should fail register', async ({ page }) => {
        await page.getByTestId('email').fill(badUser.email);
        await page.getByTestId('password').fill(badUser.password);
        await page.getByTestId('confirm-password').fill(badUser.confirmPassword);
        await page.getByTestId('register-button').click();
        await expect(page).toHaveURL('/register');
    });
})