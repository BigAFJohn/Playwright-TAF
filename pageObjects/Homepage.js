const { expect } = require('@playwright/test');
const logger = require('../logger');

class HomePage {
  constructor(page) {
    this.page = page;
    this.logo = page.locator('div.c-header__logo img');
    this.txtBoxSearch = page.locator('input[placeholder="Waar ben je naar op zoek?"]');
    this.btnSearch = page.locator('button.js_search_button');
    this.searchSuggestions = page.locator('div.c-search-suggestion button');
    this.suggestions = page.locator('div.c-search-suggestion-collection div.c-search-suggestion');
    this.categorySuggestions = page.locator('a[href^="/search/?text=:category:"]');
    this.clearSearchButton = page.locator('.search-bar__clear-button');
    this.suggestionCollection = page.locator('div.c-autocomplete-suggestions');
    this.loginField = page.locator('input[aria-label="email adres"]');
    this.passwordField = page.locator('input[aria-label="wachtwoord"]');
    this.loginSubmitBtn = page.locator('span.c-cta-main:has-text("Inloggen")');
    this.loginButton = page.locator('a[href="/login"]');
    this.acceptAllCookies = page.locator('a[id="CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"]');
    this.productTile = page.locator('.c-product-tile__link');
    this.profileIcon = page.locator('button.my-account-nav-button__button');
    this.profileButton = page.locator('.c-link:has-text("Profielbeheer")');
    this.quoteButton = page.locator('.c-link:has-text("Offertes beheren")');
    this.preferencesButton = page.locator('.c-link:has-text("Profielbeheer")');
    this.orderHistoryButton = page.locator('.c-link:has-text("Ordergeschiedenis")');
    this.logOutButton = page.locator('a[href="/logout"]');
    this.logOutMessage = page.locator('.c-cta-main:has-text("Login / Registreren")');
    this.firstElementTable = page.locator('.table__body-row');
    this.invalidCredentialsError = page.locator('.inline-notification__content b:has-text("Combinatie e-mail en wachtwoord onjuist")');
    this.emptyEmailError = page.locator('span[data-formik-error="true"]:has-text("Vul je e-mailadres in")');
  }

  async logInAsCustomer(customerEmail, customerPassword) {
    try {
      logger.info('Clicking on the login button');
      await this.loginButton.click();
      logger.info('Entering email');
      await this.loginField.fill(customerEmail);
      logger.info('Entering password');
      await this.passwordField.fill(customerPassword);
      logger.info('Clicking the login submit button');
      await this.loginSubmitBtn.click();
      logger.info('Form submitted');
    } catch (error) {
      logger.error(`Error during login: ${error.message}`);
      throw error;
    }
  }

  async getErrorMessage(locator) {
    try {
      const errorText = await locator.textContent();
      return errorText;
    } catch (error) {
      logger.error(`Error fetching error message text: ${error.message}`);
      throw error;
    }
  }

  async getURL() {
    const url = await this.page.url();
    logger.info(`Current URL: ${url}`);
    return url;
  }

  async closeCookies() {
    try {
      logger.info('Closing cookies dialog if present');
      await this.acceptAllCookies.click({ timeout: 5000 });
    } catch (error) {
      logger.warn("Cookies dialog not found, skipping");
    }
  }

  async clickOnMerkSuggestions(brand) {
    try {
      logger.info(`Waiting for brand suggestion to be visible: ${brand}`);
      const brandSuggestion = this.page.locator(`span:has-text("${brand}")`);
      await brandSuggestion.waitFor({ state: 'visible' });
      logger.info(`Clicking on brand suggestion: ${brand}`);
      await brandSuggestion.click();
    } catch (error) {
      logger.error(`Error clicking on brand suggestion: ${error.message}`);
      throw error;
    }
  }

  async checkRecentLookedAtLabelExists(article) {
    try {
      logger.info(`Checking if recent looked at label exists for article: ${article}`);
      const label = this.page.locator(`.autocomplete-products__content:has-text("${article}")`);
      await label.waitFor({ state: 'visible' });
      const exists = await label.isVisible();
      expect(exists).toBeTruthy();
    } catch (error) {
      logger.error(`Error checking recent looked at label: ${error.message}`);
      throw error;
    }
  }

  async clickOnSearchSuggestions(suggestionType, suggestion) {
    try {
      logger.info('Waiting for suggestion collections to load');
      await this.suggestionCollection.first().waitFor({ state: 'visible' });

      const count = await this.suggestionCollection.count();
      for (let i = 0; i < count; i++) {
        const suggestionTitle = await this.page.locator(`div.c-autocomplete-suggestions:nth-child(${i + 1}) h2`).innerText();
        if (suggestionTitle.toLowerCase() === suggestionType.toLowerCase()) {
          const numberOfOptions = await this.page.locator(`div.c-autocomplete-suggestions:nth-child(${i + 1}) ul > li > a > span`).count();

          for (let z = 0; z < numberOfOptions; z++) {
            const suggestionsInAutoComplete = await this.page.locator(`div.c-autocomplete-suggestions:nth-child(${i + 1}) ul > li > a > span:nth-child(${z + 1})`).innerText();
            if (suggestionsInAutoComplete.toLowerCase() === suggestion.toLowerCase()) {
              logger.info(`Clicking on suggestion: ${suggestion}`);
              await this.page.click(`div.c-autocomplete-suggestions:nth-child(${i + 1}) ul > li > a > span:nth-child(${z + 1})`);
              break;
            }
          }
          break;
        }
      }
      logger.info('Waiting for navigation after clicking on suggestion');
      await this.page.waitForNavigation({ waitUntil: 'networkidle' });
      const url = await this.page.url();
      expect(url).toContain(suggestion);
    } catch (error) {
      logger.error(`Error clicking on search suggestions: ${error.message}`);
      throw error;
    }
  }

  async clickOn(objName) {
    try {
      logger.info(`Waiting for object to be visible: ${objName}`);
      await this.page.locator(objName).waitFor({ state: 'visible' });
      logger.info(`Clicking on object: ${objName}`);
      await this.page.click(objName);
    } catch (error) {
      logger.error(`Error clicking on object: ${error.message}`);
      throw error;
    }
  }

  async openSettings() {
    try {
      logger.info('Clicking on profile icon to open settings');
      await this.profileIcon.click();
    } catch (error) {
      logger.error(`Error opening settings: ${error.message}`);
      throw error;
    }
  }

  async openOrderHistory() {
    try {
      logger.info('Clicking on order history button');
      await this.orderHistoryButton.click();
    } catch (error) {
      logger.error(`Error opening order history: ${error.message}`);
      throw error;
    }
  }

  async editProfile() {
    try {
      logger.info('Clicking on profile button to edit profile');
      await this.profileButton.click();
    } catch (error) {
      logger.error(`Error editing profile: ${error.message}`);
      throw error;
    }
  }

  async editPreferences() {
    try {
      logger.info('Clicking on preferences button to edit preferences');
      await this.preferencesButton.click();
    } catch (error) {
      logger.error(`Error editing preferences: ${error.message}`);
      throw error;
    }
  }

  async editQuotes() {
    try {
      logger.info('Clicking on quote button to edit quotes');
      await this.quoteButton.click();
    } catch (error) {
      logger.error(`Error editing quotes: ${error.message}`);
      throw error;
    }
  }

  async logOut() {
    try {
      logger.info('Clicking on logout button');
      await this.logOutButton.click();
    } catch (error) {
      logger.error(`Error logging out: ${error.message}`);
      throw error;
    }
  }

  async loggedOut() {
    try {
      logger.info('Clicking on login button to confirm logged out');
      await this.loginButton.click();
    } catch (error) {
      logger.error(`Error confirming logged out: ${error.message}`);
      throw error;
    }
  }

  async clickElement() {
    try {
      logger.info('Clicking on the first element in the table');
      await this.firstElementTable.waitFor({ state: 'visible' });
      await this.firstElementTable.click();
    } catch (error) {
      logger.error(`Error clicking on the first element in the table: ${error.message}`);
      throw error;
    }
  }
}

module.exports = HomePage;
