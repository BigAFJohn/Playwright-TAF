const { test, expect } = require('@playwright/test');
const HomePage = require('../pageObjects/Homepage'); 
const logger = require('../logger');
const testData = require('../Data/data');
const allure = require('allure-playwright').allure;

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
        allure.step('Starting test case', async () => {
          logger.info(`Starting test case: ${title}`);
        });

        await allure.step('Clicking on the login button', async () => {
          await homePage.logInAsCustomer(credentials.loginName, credentials.loginPassword);
        });

        if (expectedOutcome === 'success') {
          await allure.step('Waiting for profile icon to be visible after login', async () => {
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
          });
        } else {
          await allure.step('Waiting for error message to be visible', async () => {
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
          });
        }

        allure.step('Test case passed', async () => {
          logger.info(`Test case passed`);
        });
      } catch (error) {
        allure.step('Test case failed', async () => {
          logger.error(`Test case failed with error: ${error.message}`);
          allure.attachment('Error Screenshot', await page.screenshot({ path: 'error-screenshot.png', fullPage: true }), 'image/png');
        });
        throw error; 
      }
    });
  });
});
