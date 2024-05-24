const { expect } = require('@playwright/test');
const logger = require('../logger');
const { allure } = require('allure-playwright');

class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.txtProductBody = page.locator('h1.c-heading--h2');
    this.quoteTab = page.locator('.c-tabs__button', { hasText: 'Offerte' });
    this.quoteName = (qtName) => page.locator(`button.c-button.quotes-modal-list__button:has(span.quotes-modal-list__value.quotes-modal-list__value--reference:has-text("${qtName}"))`);
    this.addToOtherCart = page.locator('.c-cart-button-dropdown');
    this.priceAmount = page.locator('span.c-heading--h1.price__amount');
    this.priceFraction = page.locator('span.c-heading--h3.price__fraction');
    this.productToCartButton = page.locator('.c-cta-cart');
    this.dropDownButton = page.locator('.c-cart-button-dropdown');
    this.clickOnCloseButton = page.locator('.c-cta-close.c-cta-close--modal-close');
    this.priceBNGSelector = page.locator('#uspBar > div > div > div.usp-bar--links.usp-bar__item--hide-sm > span:nth-child(1) > button');
    this.priceBNGOption = page.locator('.price-toggle__type');
    this.priceFieldAmount = page.locator('.c-product-tile .formated-price__price--amount');
    this.priceFieldFraction = page.locator('.c-product-tile .formated-price__fraction');
  }

  async getProductDetails() {
    logger.info('Getting product details');
    return await allure.step('Getting product details', async () => {
      try {
        await this.page.waitForTimeout(3000);
        const productDetails = await this.txtProductBody.textContent();
        logger.info(`Product details retrieved: ${productDetails}`);
        return productDetails;
      } catch (error) {
        logger.error(`Error getting product details: ${error.message}`);
        throw error;
      }
    });
  }
  

  async addToQuote(name) {
    logger.info(`Adding to quote: ${name}`);
    return await allure.step(`Adding to quote: ${name}`, async () => {
      await this.dropDownButton.click();
      await expect(this.quoteTab).toBeVisible({ timeout: 10000 });

      await this.quoteTab.click();
      await expect(this.quoteName(name)).toBeVisible({ timeout: 40000 });

      await this.quoteName(name).click();
      await this.clickOnCloseButton.click();
    });
  }

  async addToCart() {
    logger.info('Adding product to cart');
    return await allure.step('Adding product to cart', async () => {
      await this.productToCartButton.click();
    });
  }

  async getPrice() {
    logger.info('Getting product price');
    return await allure.step('Getting product price', async () => {
      await expect(this.priceAmount).toBeVisible({ timeout: 8000 });
      const amount = await this.priceAmount.textContent();

      await expect(this.priceFraction).toBeVisible({ timeout: 8000 });
      const fraction = await this.priceFraction.textContent();

      return amount.concat(fraction);
    });
  }

  async changePricesShown(label) {
    logger.info(`Changing prices shown to: ${label}`);
    return await allure.step(`Changing prices shown to: ${label}`, async () => {
      const waitForLoaderToDisappear = async () => {
        await expect(this.page.locator('.c-loader-overlay.c-loader-overlay--loading.c-loader-overlay--tiny')).not.toBeVisible({ timeout: 5000 });
      };

      await this.priceBNGSelector.click();

      const options = {
        "Bruto": async () => {
          await waitForLoaderToDisappear();
          await this.priceBNGOption.filter({ hasText: "Bruto" }).click();
        },
        "Netto": async () => {
          await waitForLoaderToDisappear();
          await this.priceBNGOption.filter({ hasText: "Netto" }).click();
        },
        "Geen": async () => {
          await waitForLoaderToDisappear();
          await this.priceBNGOption.filter({ hasText: "Geen" }).click();
        }
      };

      if (options[label]) {
        await options[label]();
      } else {
        throw new Error("Invalid label");
      }
    });
  }

  // Function to calculate the expected delivery promise
  static getExpectedDeliveryPromiseForGC24only() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const currentHour = now.getHours();
    let promise;

    switch (dayOfWeek) {
      case 1: // Monday
        promise = currentHour < 17 ? 'uiterlijk woensdag geleverd' : 'uiterlijk donderdag geleverd';
        break;
      case 2: // Tuesday
        promise = currentHour < 17 ? 'uiterlijk donderdag geleverd' : 'uiterlijk vrijdag geleverd';
        break;
      case 3: // Wednesday
        promise = currentHour < 17 ? 'uiterlijk vrijdag geleverd' : 'uiterlijk zaterdag geleverd';
        break;
      case 4: // Thursday
        promise = currentHour < 17 ? 'uiterlijk zaterdag geleverd' : 'uiterlijk maandag geleverd';
        break;
      case 5: // Friday
        promise = currentHour < 17 ? 'uiterlijk maandag geleverd' : 'uiterlijk woensdag geleverd';
        break;
      case 6: // Saturday
      case 0: // Sunday
        promise = 'uiterlijk woensdag geleverd';
        break;
      default:
        promise = '';
    }

    return `Voor 17:00 uur besteld, ${promise}`;
  }

  async verifyDeliveryMessageForGC24OnlyProduct() {
    const expectedMessage = ProductDetailsPage.getExpectedDeliveryPromiseForGC24only();
    const fulfilmentMessageText = this.page.locator('span.fulfilment-message__text');
    logger.info(`Expected delivery promise message for GC24 only product on the PDP is: ${expectedMessage}`);
    return await allure.step('Verifying delivery message for GC24 only product', async () => {
      await expect(fulfilmentMessageText).toHaveText(expectedMessage, { timeout: 10000 });
    });
  }
}

module.exports = ProductDetailsPage;
