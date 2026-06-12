import { expect, test, chromium } from '@playwright/test';

// Without fixture
test('should load the page', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://binaryville.com/account');
  const signInButton = page.getByRole('button', { name: 'Sign in' });
  await expect(signInButton).toBeVisible();

  await browser.close();
});

// With page fixture
test('should load the page with fixture', async ( { page }) => {
  await page.goto('https://binaryville.com/account');
  const signInButton = page.getByRole('button', { name: 'Sign in' });
  await expect(signInButton).toBeVisible();
});