const { test, expect } = require('@playwright/test');
const HomePage = require('../pageObjects/Homepage');
const ProductListPage = require('../pageObjects/ProductListPage');
const Utilities = require('../Utilities');
const testData = require('../Data/data');
const logger = require('../logger');
const allure = require('allure-playwright').allure;

test.describe('001_Filters_and_Facets', () => {
  let homePage;
  let productListPage;
  let utilities;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productListPage = new ProductListPage(page);
    utilities = new Utilities(page);

    // Maximize the browser window
    await page.evaluate(() => {
        window.moveTo(0, 0);
        window.resizeTo(screen.width, screen.height);
      });

    await page.goto(testData.environmentUrl);
    await homePage.closeCookies();
    await page.waitForTimeout(2000);
    await homePage.logInAsCustomer(testData.validCredentials.loginName, testData.validCredentials.loginPassword);
  });

  test('001_01_Filtering_with_MultipleFilter', async ({ page }) => {
    try {
        await allure.step('Starting test case: 001_01_Filtering_with_MultipleFilter', async () => {
            logger.info('Starting test case: 001_01_Filtering_with_MultipleFilter');
        });

        await homePage.enterAndSearch(testData.filterTerm1);
        await page.waitForTimeout(3000);
        let totalResultsBeforeFilter = await productListPage.getResultsFromPaginationHeader();

        // Test classification filter
        await productListPage.clickOnClassificationFilter(testData.filterProductType1);
        await page.waitForTimeout(3000);
        await productListPage.verifyFilter(testData.filterProductType1);

        // Test unfolded filter with more
        await productListPage.clickOnToonMeerButton();
        await page.waitForTimeout(3000);
        await productListPage.clickOnDynamicFilter(testData.filterBrand1);
        await utilities.clickCloseButton();
        await page.waitForTimeout(3000);
        await productListPage.verifyFilter(testData.filterBrand1);

        // Test dynamic unfolded filter based on previously chosen filters
        await productListPage.clickOnToonMeerSerieButton();
        await page.waitForTimeout(3000);
        await productListPage.clickOnDynamicFilter(testData.filterSeries1);
        await utilities.clickCloseButton();
       
        await productListPage.verifyFilter(testData.filterSeries1);

        // Test dynamic folded filter
        await productListPage.clickOnExpand(testData.newBrand);
        await productListPage.clickOnDynamicFilter(testData.filterMountingMethod1);
        await productListPage.verifyFilter(testData.filterMountingMethod1);

        // Just to be sure: is that all?
        await productListPage.countFacets(4);

        // Let's clear everything and pretend nothing happened
        await productListPage.clearAllFilters();
        await productListPage.countFacets(0);

        const totalResultsAfterFilter = await productListPage.getResultsFromPaginationHeader();
        expect(totalResultsBeforeFilter).toEqual(totalResultsAfterFilter);
    } catch (error) {
        logger.error(`Test case 001_01_Filtering_with_MultipleFilter failed with error: ${error.message}`);
        throw error;
    }
});


  test('001_02_Filtering_with_SingleFilterAndRemovingTheFilter', async ({ page }) => {
    try {
      await allure.step('Starting test case: 001_02_Filtering_with_SingleFilterAndRemovingTheFilter', async () => {
        logger.info('Starting test case: 001_02_Filtering_with_SingleFilterAndRemovingTheFilter');
      });
  
      await homePage.enterAndSearch(testData.filterTerm1);
      const totalResultsBeforeFilter = await productListPage.getResultsFromPaginationHeader();
  
      await productListPage.clickOnClassificationFilter(testData.filterProductType1);
      await productListPage.verifyFilter(testData.filterProductType1);
      await productListPage.countFacets(1);
  
      await productListPage.clearFilter(testData.filterProductType1);
      await productListPage.countFacets(0);
  
      const totalResultsAfterFilter = await productListPage.getResultsFromPaginationHeader();
      expect(totalResultsBeforeFilter).toEqual(totalResultsAfterFilter);
      logger.info('Test case 001_02_Filtering_with_SingleFilterAndRemovingTheFilter passed');
    } catch (error) {
      logger.error(`Test case 001_02_Filtering_with_SingleFilterAndRemovingTheFilter failed with error: ${error.message}`);
      throw error;
    }
  });
  

  test('001_03_Filtering_with_Filter_in_heading', async ({ page }) => {
    try {
      allure.step('Starting test case: 001_03_Filtering_with_Filter_in_heading', async () => {
        logger.info('Starting test case: 001_03_Filtering_with_Filter_in_heading');
      });

      await homePage.enterAndSearch(testData.filterTerm1);
      let totalResultsBeforeFilter = await productListPage.getResultsFromPaginationHeader();

      await productListPage.clickOnToonMeerButton();
      await page.waitForTimeout(3000);
      await productListPage.clickOnDynamicFilter(testData.filterQuickBrand);
      await utilities.clickCloseButton();
      await page.waitForTimeout(3000);
      await productListPage.verifyFilter(testData.filterQuickBrand);
      await productListPage.countFacets(1);

      await productListPage.clickOnQuickFilter(testData.filterQuickSeries);
      await productListPage.verifyFilter(testData.filterQuickSeries);
      await productListPage.countFacets(2);

      await productListPage.clearAllFilters();
      await productListPage.countFacets(0);

      const totalResultsAfterFilter = await productListPage.getResultsFromPaginationHeader();
      expect(totalResultsBeforeFilter).toEqual(totalResultsAfterFilter);
    } catch (error) {
      logger.error(`Test case 001_03_Filtering_with_Filter_in_heading failed with error: ${error.message}`);
      throw error;
    }
  });
});
