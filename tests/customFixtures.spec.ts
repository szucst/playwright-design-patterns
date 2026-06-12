import { test as base, expect } from '@playwright/test';

const test = base.extend<{
  testData: { email: string; password: string };
  authenticatedUser: import('@playwright/test').Page;
}>({
  testData: async ({ }, use) => {
    // Set up the custom fixture
    const data = {
        email: "test@email.com",
        password: "password123"
    };
    await use(data);
    // Clean up if necessary
  },
  authenticatedUser: [async ({ page, testData }, use) => {
    await page.goto('https://binaryville.com/account');
    const emailInput = page.getByRole('textbox', { name: 'Email' });
    await emailInput.fill(testData.email);

    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    await passwordInput.fill(testData.password);

    const signInButton = page.getByRole('button', { name: 'Sign in' });
    await signInButton.click();
    
    await use(page);
  }, {
    auto: true, // Automatically use this fixture in tests
  }]
});

// test('should use custom fixture', async ({ page, testData }) => {
//   await page.goto('https://binaryville.com/account');
//   const emailInput = page.getByRole('textbox', { name: 'Email' });
//   await emailInput.fill(testData.email);

//   const passwordInput = page.getByRole('textbox', { name: 'Password' });
//   await passwordInput.fill(testData.password);

//   const signInButton = page.getByRole('button', { name: 'Sign in' });
//   await signInButton.click();

//   const url = page.url();
//   expect(url).toContain(testData.password);
// });

test('should use custom fixture with auto set to true', async ({ page, testData }) => {
  const url = page.url();
  expect(url).toContain(testData.password);
});