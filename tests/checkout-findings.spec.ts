import { expect, test, type Page } from '@playwright/test';
import { loginAsStandardUser } from './helpers';

async function openCheckout(page: Page) {
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
}

async function enterDetails(page: Page, firstName: string) {
  await page.getByPlaceholder('First Name').fill(firstName);
  await page.getByPlaceholder('Last Name').fill('Test');
  await page.getByPlaceholder('Zip/Postal Code').fill('411001');
  await page.getByRole('button', { name: 'Continue' }).click();
}

// These probes reproduce reported demo behavior. A failure can mean the site fixed it.
test('QA-01: empty cart reaches order confirmation', async ({ page }, info) => {
  await loginAsStandardUser(page);
  await openCheckout(page);
  await enterDetails(page, 'Taylor');
  await expect(page).toHaveURL(/checkout-step-two/);
  await expect(page.locator('.cart_item')).toHaveCount(0);
  await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $0.00');
  await info.attach('Empty cart overview', { body: await page.screenshot(), contentType: 'image/png' });
  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByText('Thank you for your order!', { exact: true })).toBeVisible();
  await info.attach('Order confirmation', { body: await page.screenshot(), contentType: 'image/png' });
});

test('QA-02: a whitespace-only first name reaches order review', async ({ page }, info) => {
  await loginAsStandardUser(page);
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await openCheckout(page);
  await expect(page.getByPlaceholder('First Name')).toHaveValue('');
  await enterDetails(page, '');
  await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  await page.getByPlaceholder('First Name').fill('   ');
  await expect(page.getByPlaceholder('First Name')).toHaveValue('   ');
  await info.attach('Whitespace entered', { body: await page.screenshot(), contentType: 'image/png' });
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/checkout-step-two/);
  await info.attach('Order review reached', { body: await page.screenshot(), contentType: 'image/png' });
});
