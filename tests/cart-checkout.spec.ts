import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from './helpers';

test('user can add and remove a product from cart', async ({ page }) => {
  await loginAsStandardUser(page);
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await page.getByRole('link', { name: 'Shopping Cart' }).click();
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.locator('.cart_item')).toHaveCount(0);
});

test('user can complete checkout', async ({ page }) => {
  await loginAsStandardUser(page);
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.getByRole('link', { name: 'Shopping Cart' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByPlaceholder('First Name').fill('QA');
  await page.getByPlaceholder('Last Name').fill('Portfolio');
  await page.getByPlaceholder('Zip/Postal Code').fill('411001');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('Checkout: Overview')).toBeVisible();
  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});

test('checkout requires customer information', async ({ page }) => {
  await loginAsStandardUser(page);
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.getByRole('link', { name: 'Shopping Cart' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
});
