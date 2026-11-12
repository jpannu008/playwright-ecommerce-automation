import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from './helpers';

test('standard user can log in', async ({ page }) => {
  await loginAsStandardUser(page);
  await expect(page.getByText('Products')).toBeVisible();
});

test('invalid password displays an error', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('[data-test="error"]')).toContainText(
    'Username and password do not match'
  );
});
