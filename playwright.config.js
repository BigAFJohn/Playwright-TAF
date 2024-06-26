// playwright.config.js
const { devices } = require('@playwright/test');
const allure = require('allure-playwright');

module.exports = {
  testDir: './tests', // Directory where test files are located
  timeout: 50000, // Timeout for each test in milliseconds
  expect: {
    timeout: 5000 // Timeout for expect assertions
  },
  retries: 0, // Number of retries on failure
  // reporter: [['html', { open: 'never' }]], // Reporter configuration
  reporter: [
    ['list'],
    ['allure-playwright'],
  ], 
  use: {
    headless: true, 
    viewport: null, // Disable fixed viewport size
    actionTimeout: 0, // Timeout for actions like click
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    video: 'retain-on-failure', // Record video only on test failure
    trace: 'retain-on-failure', // Capture trace only on test failure
    browserName: 'chromium',
    channel: 'chrome'
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
};
