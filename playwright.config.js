// playwright.config.js
const { devices } = require('@playwright/test');

module.exports = {
  testDir: './tests', // Directory where test files are located
  timeout: 30000, // Timeout for each test in milliseconds
  expect: {
    timeout: 5000 // Timeout for expect assertions
  },
  retries: 0, // Number of retries on failure
  reporter: [['html', { open: 'never' }]], // Reporter configuration
  use: {
    headless: true, 
    viewport: { width: 1280, height: 720 }, // Default viewport size
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
