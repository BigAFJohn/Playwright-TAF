const { test, expect } = require('@playwright/test');
const HomePage = require('../pageObjects/Homepage');
const ProductListPage = require('../pageObjects/ProductListPage');
const ProductDetailsPage = require('../pageObjects/ProductDetailsPage');
const testData = require('../Data/data');
const logger = require('../logger');
const { allure } = require('allure-playwright');

test.describe('Search_Tests', () => {
  let homePage;
  let productListPage;
  let productDetailsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productListPage = new ProductListPage(page);
    productDetailsPage = new ProductDetailsPage(page);

    await page.goto(testData.environmentUrl);
    await homePage.closeCookies();
    await homePage.logInAsCustomer(testData.validCredentials.loginName, testData.validCredentials.loginPassword);
  });

  test('002_01_Searching_By_clicking_SearchSuggestion', async ({ page }) => {
    try {
      allure.step('Starting test case: 002_01_Searching_By_clicking_SearchSuggestion', async () => {
        logger.info('Starting test case: 002_01_Searching_By_clicking_SearchSuggestion');
      });
     
      await homePage.enterText(homePage.txtBoxSearch, testData.searchSuggestion);
      await page.waitForTimeout(3000);
      await homePage.clickOnSearchSuggestions(testData.searchTerm);
      await productListPage.elementExists(productListPage.numberOfProducts);
    } catch (error) {
      logger.error(`Test case 002_01_Searching_By_clicking_SearchSuggestion failed with error: ${error.message}`);
      throw error;
    }
  });

  test('002_03_Searching_By_Exact_EAN', async ({ page }) => {
    try {
      allure.step('Starting test case: 002_03_Searching_By_Exact_EAN', async () => {
        logger.info('Starting test case: 002_03_Searching_By_Exact_EAN');
      });

      await homePage.enterAndSearch(testData.EAN);
      const value = await productDetailsPage.getProductDetails('EAN');
      expect(value).toEqual(`"${testData.EAN}"`);
    } catch (error) {
      logger.error(`Test case 002_03_Searching_By_Exact_EAN failed with error: ${error.message}`);
      throw error;
    }
  });

  test('002_04_Searching_By_Exact_Article', async ({ page }) => {
    try {
      allure.step('Starting test case: 002_04_Searching_By_Exact_Article', async () => {
        logger.info('Starting test case: 002_04_Searching_By_Exact_Article');
      });

      await homePage.enterAndSearch(testData.artikel);
      const value = await productDetailsPage.getProductDetails('artikel');
      expect(value).toEqual(`"${testData.artikel}"`);
    } catch (error) {
      logger.error(`Test case 002_04_Searching_By_Exact_Article failed with error: ${error.message}`);
      throw error;
    }
  });

  test('002_05_Searching_By_Term', async ({ page }) => {
    try {
      allure.step('Starting test case: 002_05_Searching_By_Term', async () => {
        logger.info('Starting test case: 002_05_Searching_By_Term');
      });

      await homePage.enterAndSearch(testData.subBrand);
      await productListPage.searchTermDisplayed(`"${testData.subBrand}"`);
    } catch (error) {
      logger.error(`Test case 002_05_Searching_By_Term failed with error: ${error.message}`);
      throw error;
    }
  });

  test('002_06_Searching_By_Category', async ({ page }) => {
    try {
      allure.step('Starting test case: 002_06_Searching_By_Category', async () => {
        logger.info('Starting test case: 002_06_Searching_By_Category');
      });

      await homePage.enterAndSearch(testData.category);
      await productListPage.elementExists(productListPage.numberOfProducts);
    } catch (error) {
      logger.error(`Test case 002_06_Searching_By_Category failed with error: ${error.message}`);
      throw error;
    }
  });

  test('002_07_Search_Clicking_On_First_Last_Viewed_Articles', async ({ page }) => {
    try {
      allure.step('Starting test case: 002_07_Search_Clicking_On_First_Last_Viewed_Articles', async () => {
        logger.info('Starting test case: 002_07_Search_Clicking_On_First_Last_Viewed_Articles');
      });

      await homePage.enterAndSearch(testData.artikel);
      await homePage.clickOn(productListPage.productTileWithId(testData.artikel));
      await homePage.clickOn(homePage.logo);
      await homePage.clickOn(homePage.txtBoxSearch);
      await page.waitForTimeout(1500); // Animation needs a wait
      await homePage.checkRecentLookedAtLabelExists(testData.artikel);
    } catch (error) {
      logger.error(`Test case 002_07_Search_Clicking_On_First_Last_Viewed_Articles failed with error: ${error.message}`);
      throw error;
    }
  });
});
