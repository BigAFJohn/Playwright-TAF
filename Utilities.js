const { expect } = require('@playwright/test');
const { page } = require('playwright');
const logger = require('./logger');
const { allure } = require('allure-playwright'); 

class Utilities {
  constructor(page) {
    this.page = page;
    this.notificationBarClose = page.locator('.c-cta-close.c-cta-close--modal-close');
    this.clickButtonModalClose = page.locator('button[type="button"]');
    this.closeBtn = page.locator('.c-cta-close.c-cta-close--overlay-close');
    this.clickOnCloseButton = page.locator('.c-cta-close.c-cta-close--modal-close');
  }

  async removeFocus() {
    await this.page.evaluate(() => document.activeElement.blur());
  }

  async goBack() {
    await this.page.goBack();
  }

  async getURL() {
    return await this.page.url();
  }

  async clickOnClose() {
    await this.page.waitForTimeout(2000);
    await this.page.click(this.clickOnCloseButton);
  }

  async closeModal() {
    await this.page.click(this.clickButtonModalClose);
  }

  async closeNotificationBar() {
    const loaderOverlay = this.page.locator('.c-loader-overlay.c-loader-overlay--loading.c-loader-overlay--tiny');
    if (await loaderOverlay.count()) {
      await expect(loaderOverlay).not.toBeVisible({ timeout: 10000 });
    }
  }

  async clickCloseButton() {
    logger.info('Clicking the close button');
    return await allure.step('Clicking the close button', async () => {
      try {
        await this.closeBtn.click();
        await this.page.waitForSelector('.c-cta-close.c-cta-close--overlay-close', { state: 'hidden', timeout: 10000 });
        logger.info('Close button clicked and overlay closed');
      } catch (error) {
        logger.error(`Failed to click the close button: ${error.message}`);
        throw error;
      }
    });
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getNextBusinessDay(date) {
    date = new Date(+date);
    do {
      date.setDate(date.getDate() + 1);
    } while (!(date.getDay() % 6));
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  randomValue(startingString) {
    const num = Math.floor(Math.random() * 10000000);
    return startingString + num;
  }

  async currentURL() {
    return await this.page.url();
  }
}

module.exports = Utilities;
