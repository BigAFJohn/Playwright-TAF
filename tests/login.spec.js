const { test, expect } = require('@playwright/test');
const HomePage = require('../pageObjects/Homepage'); 
const logger = require('../logger');
const testData = require('../Data/data');

test.describe('Login Tests', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await page.goto(testData.environmentUrl);
    await homePage.closeCookies(); 
  });

  const loginTestCases = [
    {
      title: 'User should log in with valid credentials',
      credentials: testData.validCredentials,
      expectedOutcome: 'success',
    },
    {
      title: 'User should not log in with incorrect credentials',
      credentials: testData.invalidCredentials,
      expectedOutcome: 'error',
      errorLocator: 'invalidCredentialsError',
    },
    {
      title: 'User should not log in with empty email and password fields',
      credentials: testData.emptyCredentials,
      expectedOutcome: 'error',
      errorLocator: 'emptyEmailError',
    },
  ];

  loginTestCases.forEach(({ title, credentials, expectedOutcome, errorLocator }) => {
    test(title, async ({ page }) => {
      try {
        logger.info(`Starting test case: ${title}`);
        await homePage.logInAsCustomer(credentials.loginName, credentials.loginPassword);

        if (expectedOutcome === 'success') {
          logger.info('Waiting for profile icon to be visible after login');
          await page.waitForTimeout(2000);
          const profileIconVisible = await homePage.profileIcon.isVisible();

          const expectedProfileIconVisible = true;
          const actualProfileIconVisible = profileIconVisible;
          logger.info(`Expected: ${expectedProfileIconVisible}, Actual: ${actualProfileIconVisible}`);
          expect(actualProfileIconVisible).toBeTruthy();

          const url = await homePage.getURL();
          const expectedUrlSubstring = 'account';
          const actualUrl = url;
          logger.info(`Expected URL to contain: ${expectedUrlSubstring}, Actual URL: ${actualUrl}`);
          expect(actualUrl).toContain(expectedUrlSubstring);
        } else {
          logger.info('Waiting for error message to be visible');
          await page.waitForTimeout(2000);
          const errorMessageVisible = await homePage[errorLocator].isVisible();
          logger.info(`Expected: true, Actual: ${errorMessageVisible}`);
          expect(errorMessageVisible).toBeTruthy();

          const errorText = await homePage.getErrorMessage(homePage[errorLocator]);
          logger.info(`Actual error message on login page: ${errorText}`);
          const expectedErrorText = credentials.errorMessage;
          const actualErrorText = errorText;
          logger.info(`Expected error message: ${expectedErrorText}, Actual error message: ${actualErrorText}`);
          expect(actualErrorText).toContain(expectedErrorText);
        }

        logger.info(`Test case passed`);
      } catch (error) {
        logger.error(`Test case failed with error: ${error.message}`);
        throw error;
      }
    });
  });
});
