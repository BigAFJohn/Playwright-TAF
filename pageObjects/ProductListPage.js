const { expect } = require('@playwright/test');
const allure = require('allure-playwright').allure;
const logger = require('../logger');

class ProductListPage {
  constructor(page) {
    this.page = page;
    this.txtFacet = page.locator('span.facet__list__text');
    this.listOfFilters = page.locator('ul.facet__list > li');
    this.facetChip = page.locator('.c-cta-remove__cta');
    this.mobileFacetChip = page.locator('#PliegerAppModals span.c-cta-remove');
    this.buttonLabel = page.locator('span.SVGInline.c-cta-collapse__icon');
    this.filterCollapseBox = (lbl) => page.locator(`.c-cta-collapse:has-text("${lbl}")`);
    this.filterExpandPlus = (lbl) => page.locator(`.c-cta-more:has-text("${lbl}")`);
    this.options = (label) => page.locator(`label.c-checkbox-label__span:has-text("${label}")`).nth(0);
    this.mobileOptions = (label) => page.locator(`#PliegerAppModals label:has-text("${label}")`);
    this.button = (btnName) => page.locator(`div.c-content button.c-button:has-text("${btnName}")`);
    this.mobileButton = (btnName) => page.locator(`#PliegerAppModals button.c-button:has-text("${btnName}")`);
    this.sectionSelectedFilters = page.locator('div.main__inner-wrapper p.c-remove-filters__non-selected');
    this.txtNoSelectedFilters = "Er zijn nog geen filters geselecteerd";
    this.mobileBtnFilter = page.locator('svg.c-product-overview-controls__filter-icon-svg');
    this.mobileFilterCollapseBox = (lbl) => page.locator(`#PliegerAppModals div.c-collapse-box button > span:has-text("${lbl}")`);
    this.paginationList = page.locator('ul.c-pagination__list');
    this.paginationNumber = (number) => page.locator(`span.c-pagination__number:has-text("${number}")`);
    this.numberOfProducts = page.locator('p.c-pagination__number-of-results').first();
    this.getURL = () => this.page.url();
    this.getURL = () => page.url();
    this.btnAddToCart = page.locator('span.c-cta-cart');
    this.productTilePliegerNumber = page.locator('div.c-product-tile__pliegernr');
    this.iconMiniBasket = page.locator('.c-cta-cart-amount__icon');
    this.firstProduct = page.locator('.c-product-tile .c-cta-cart').first();
    this.minicartAmount = page.locator('.c-cta-cart-amount__amount');
    this.firstItemIncart = page.locator('p.c-cart-item__pliegernr');
    this.emptyCartDiv = page.locator('.empty-cart-title');
    this.minicartOverlay = page.locator('.c-cta-cart-amount__icon');
    this.cartName = (crtName) => page.locator(`button.c-button.c-cart-list-item:has-text("${crtName}")`);
    this.quoteName = (qtName) => page.locator(`.quotes-modal-list__value:has-text("${qtName}")`);
    this.firstProductToCart = page.locator('.c-cta-cart').first();
    this.firstProductID = page.locator('.product-tile__code-cta');
    this.productTileWithId = (id) => page.locator(`.c-product-tile:has-text("${id}")`);
    this.firstProductQuantity = page.locator('.c-cta-cart-added__number');
    this.miniCart = page.locator('.c-cta-cart-amount');
    this.miniCartPopout = page.locator('.c-mini-cart-modal-wrapper');
    this.miniCartClose = page.locator('.c-cta-close--modal-close');
    this.cartManagement = page.locator('.c-selectbox__select');
    this.createNewCartButton = page.locator('.mini-cart__link');
    this.createNewQuoteButton = page.locator('.c-cta-main--white:has-text("Nieuwe offerte")');
    this.selectCart = page.locator('.c-cta-main--black:has-text("Selecteer een winkelwagen")');
    this.openQuoteBar = page.locator('.c-cta-main--black:has-text("Ga naar de offerte")');
    this.newCartName = page.locator('#name');
    this.newQuoteName = page.locator('input[id="customerReference"]');
    this.activeCartName = page.locator('.input__input');
    this.editCart = page.locator('.c-cart__edit-icon');
    this.removeCart = page.locator('.c-manage-carts-options-modal__button:has-text("Verwijderen")');
    this.confirmRemoveCart = page.locator('.c-cta-main:has-text("Verwijder winkelwagen")');
    this.removeFirstCartItem = page.locator('.c-cart-item__bin-button');
    this.setCartToActiveBox = page.locator('label[for="SwitchToNewCartCheckbox"]');
    this.addToOtherCart = (i) => page.locator('.c-cart-button-dropdown').nth(i);
    this.expandAppliedFilters = page.locator('.c-cta-collapse__icon-svg').first();
    this.searchedTerm = page.locator('.c-heading--h2');
    this.openCartPage = page.locator('.c-cta-main:has-text("Naar winkelwagen")');
    this.firstProductToFavManage = page.locator('.favorite-button__button--manage-favs').first();
    this.firstProductTile = page.locator('.product-tile__code-cta').first();
    this.productTile = (index) => page.locator('.product-tile__code-cta').nth(index);
    this.saveCartName = page.locator('.c-cta-main:has-text("Bewaar")');
    this.checkboxFavoriteList = (favName) => page.locator(`.c-checkbox-label__span:has-text("${favName}")`);
    this.closeModal = page.locator('.c-modal--show .c-cta-close--modal-close');
    this.closeNewCartModal = page.locator('.c-modal-heading-close__close-button');
    this.quoteTab = page.locator('.c-tabs__button:has-text("Offerte")');
    this.noActiveCartSelected = page.locator('.c-cta-main--black:has-text("Selecteer een winkelwagen")');
    this.addToListFav = page.locator('.c-cta-icon-label__label:has-text("Voeg toe aan favorietenlijst")');
    this.priceFieldAmount = page.locator('.c-product-tile .formated-price__price--amount').first();
    this.priceFieldFraction = page.locator('.c-product-tile .formated-price--fraction').first();
    this.priceBNGSelector = page.locator('#uspBar .usp-bar--links.usp-bar__item--hide-sm span button');
    this.priceBNGOption = page.locator('.price-toggle__type');
    this.priceFieldMinicartBruto = page.locator('.c-cart-item__price-and-discount__label.c-copy--small-copy span:nth-of-type(2)').first();
    this.priceFieldMinicartNetto = page.locator('.c-cart-item__price').first();
    this.cartAddPopUp = page.locator('.Toastify__close-button');
    this.minicartDiv = page.locator('.c-mini-cart-container');
    this.cartItems = page.locator('.c-cart-list-item__name');
    this.firstInactiveCartItem = page.locator('div.c-cart-overview__list > div:nth-child(1) div > span.c-cart-list-item__name').first();
    this.classificationFilter = (filter) => page.locator(`button.c-menu-item:has(span.menu-item__value[title="${filter}"])`);
    this.filterSection = (filter) => page.locator(`span:has-text("${filter}")`);
    this.filterFacetChip = (filter) => page.locator(`span.c-cta-remove-light__text:has-text("${filter}")`);
    this.filterFacetChips = page.locator('.remove-filters-title-wrapper').locator('span:not(.remove-filters-title)');
    this.quickFilter = (filter) => page.locator(`button .c-cta-text:has-text("${filter}")`);
    this.toonMeerButton = page.locator('.c-cta-more').nth(1);
    this.toonMeerSerieButton = page.locator('.c-cta-more').nth(2);
    this.productTileFavIcon = (index) => page.locator('.c-cta-favorite__icon--large').nth(index);
    this.favoritesIcon = page.locator('button.favorites-nav-button__button');
    this.createNewFavListButton = page.locator('.c-cta-main--plain');
    this.createNewFavListName = page.locator('#collectionName');
    this.createNewFavListSubmit = page.locator('form > button[type="submit"] > span:has-text("Voltooi")');
    this.selectFavList = (name) => page.locator(`input[name="${name}"]`).nextSibling();
    this.continueShoppingButton = page.locator('.c-cta-main--black:has-text("Verder winkelen")');
    this.quoteNameTest = (qtNameTest) => page.locator(`.quotes-modal-list__value:has-text("${qtNameTest}")`);
    this.olProduct = page.locator('.product-tile__image .c-image-container .LazyLoad img');
    this.alternativeProductLink = page.locator('.product-alternative-block__product .product-alternative-block__product-availability a');
    this.addGcVariantButton = page.locator('button.c-button.c-product-tile-buttons__button').nth(1);
    this.openFlyIn = page.locator('.c-product-alternative-block');
    this.clickOnGC24VariantButton = page.locator('.c-product-tile-light:nth-child(2) > div > div > div > div');
    this.productLink = page.locator('a[title="Hoek nr.120 i/i 45deg 1/2" zwart"]');
    this.pliegerOnlyProduct = page.locator('.product-tile__header');
    this.cartButton = page.locator('button.c-button.cart-nav-button__button');
  }

  async enterAndSearch(searchText) {
    logger.info('Entering search text');
    await allure.step(`Entering search text: ${searchText}`, async () => {
      await this.page.fill('input[placeholder="Waar ben je naar op zoek?"]', '');
      await this.page.fill('input[placeholder="Waar ben je naar op zoek?"]', searchText);
      await this.page.keyboard.press('Enter');
    });
  }

  async filterProducts(filter) {
    logger.info(`Filtering products with filter: ${filter}`);
    await allure.step(`Filtering products with filter: ${filter}`, async () => {
      const filterCount = await this.txtFacet.count();
      for (let i = 0; i < filterCount; i++) {
        const innerText = await this.txtFacet.nth(i).innerText();
        if (innerText.toLowerCase().includes(filter.toLowerCase())) {
          await this.txtFacet.nth(i).click();
          break;
        }
      }
    });
  }

  async checkForFacetChips(filter) {
    logger.info(`Checking for facet chips with filter: ${filter}`);
    await allure.step(`Checking for facet chips with filter: ${filter}`, async () => {
      const width = await this.page.viewportSize().width;
      if (width > 760) {
        await this.expandAppliedFilters.click();
        const count = await this.facetChip.count();
        let found = false;
        for (let i = 0; i < count; i++) {
          let par = await this.facetChip.nth(i).innerText();
          par = par.trimRight();
          if (par === filter) {
            found = true;
            break;
          }
        }
        expect(found).toBeTruthy();
      } else {
        const count = await this.mobileFacetChip.count();
        await this.expandAppliedFilters.click();
        let found = false;
        for (let i = 0; i < count; i++) {
          let par = await this.mobileFacetChip.nth(i).innerText();
          par = par.trimRight();
          if (par.toLowerCase() === filter.toLowerCase()) {
            found = true;
            break;
          }
        }
        expect(found).toBeTruthy();
      }
    });
  }

  async removeFilter(filter) {
    logger.info(`Removing filter: ${filter}`);
    await allure.step(`Removing filter: ${filter}`, async () => {
      const width = await this.page.viewportSize().width;
      if (width > 760) {
        const count = await this.facetChip.count();
        for (let i = 0; i < count; i++) {
          const chosenFilter = await this.facetChip.nth(i).innerText();
          if (chosenFilter.trimRight().toLowerCase() === filter.toLowerCase()) {
            await this.facetChip.nth(i).click();
            break;
          }
        }
        const url = await this.page.url();
        expect(url).not.toContain(filter);
      } else {
        const count = await this.mobileFacetChip.count();
        for (let i = 0; i < count; i++) {
          const chosenFilter = await this.mobileFacetChip.nth(i).innerText();
          if (chosenFilter.trimRight().toLowerCase() === filter.toLowerCase()) {
            await this.mobileFacetChip.nth(i).click();
            break;
          }
        }
        const url = await this.page.url();
        expect(url).not.toContain(filter);
      }
    });
  }

  async clickOnExpand(lbl) {
    logger.info(`Clicking on expand button with label: ${lbl}`);
    await allure.step(`Clicking on expand button with label: ${lbl}`, async () => {
      const width = await this.page.viewportSize().width;
      if (width > 760) {
        const txt = await this.filterCollapseBox(lbl).innerText();
        const att = await this.filterCollapseBox(lbl).getAttribute('class');
        if (att.indexOf('--open') === -1 && txt.toLowerCase() === lbl.toLowerCase()) {
          await this.filterCollapseBox(lbl).click();
        }
      } else {
        const txt = await this.mobileFilterCollapseBox(lbl).innerText();
        const att = await this.mobileFilterCollapseBox(lbl).getAttribute('class');
        if (att.indexOf('--open') === -1 && txt.toLowerCase() === lbl.toLowerCase()) {
          await this.mobileFilterCollapseBox(lbl).click();
        }
      }
    });
  }

  async clickOnExpandPlus(lbl) {
    logger.info(`Clicking on expand plus button with label: ${lbl}`);
    await allure.step(`Clicking on expand plus button with label: ${lbl}`, async () => {
      await this.filterExpandPlus(lbl).click();
    });
  }

  async chooseOptions(label) {
    logger.info(`Choosing options with label: ${label}`);
    await allure.step(`Choosing options with label: ${label}`, async () => {
      const width = await this.page.viewportSize().width;
      if (width > 760) {
        await this.options(label).click();
      } else {
        await this.mobileOptions(label).click();
      }
    });
  }

  async clickOnButton(btnName) {
    logger.info(`Clicking on button with name: ${btnName}`);
    await allure.step(`Clicking on button with name: ${btnName}`, async () => {
      const width = await this.page.viewportSize().width;
      if (width > 760) {
        await this.button(btnName).click();
      } else {
        await this.mobileButton(btnName).click();
      }
    });
  }

  async clearAllFilters() {
    logger.info('Clearing all filters');
    await allure.step('Clearing all filters', async () => {
      await this.page.evaluate(() => window.scrollTo(0, 0));
      await this.page.locator('span.c-cta-remove-light.c-cta-remove-light__remove-all span.c-cta-remove-light__text').withText('Wis alle').click();
    });
  }

  async validateNoFilter() {
    logger.info('Validating no filter is applied');
    await allure.step('Validating no filter is applied', async () => {
      expect(await this.facetChip.count()).toBe(0);
    });
  }

  async clickOnIcon(object) {
    logger.info('Clicking on icon');
    await allure.step('Clicking on icon', async () => {
      await object.click();
    });
  }

  async paginationByClickingOnPageNumber(pageNumber) {
    logger.info(`Paginating by clicking on page number: ${pageNumber}`);
    await allure.step(`Paginating by clicking on page number: ${pageNumber}`, async () => {
      await this.paginationNumber(pageNumber).click();
      await this.page.waitForTimeout(5000);
      let number = await this.numberOfProducts.innerText();
      number = number.split(' ');
      const currentNumberOfProducts = number[0];
      expect(currentNumberOfProducts).toContain(((20 * parseInt((pageNumber - 1), 10)) + 1).toString());
    });
  }

  async elementExists(element) {
    logger.info('Checking if element exists');
    await allure.step('Checking if element exists', async () => {
      try {
        await expect(element).toBeVisible({ timeout: 10000 });
        logger.info(`The element ${element} is visible`);
      } catch (error) {
        logger.error(`The element ${element} is not visible, please check: ${error.message}`);
        throw error;
      }
    });
  }
  

  async clickAddToBasket() {
    logger.info('Clicking on Add to Basket');
    await allure.step('Clicking on Add to Basket', async () => {
      await this.btnAddToCart.nth(1).click();
    });
  }

  async addRandomProductOnPage() {
    logger.info('Adding random product on page');
    await allure.step('Adding random product on page', async () => {
      await this.addFirstProduct();
    });
  }

  async addZeroProductOnPLP() {
    logger.info('Adding zero product on PLP');
    await allure.step('Adding zero product on PLP', async () => {
      await this.addFirstProduct();
    });
  }

  async addGC24OnlyProductToCart() {
    logger.info('Adding GC24 Only product to cart');
    await allure.step('Adding GC24 Only product to cart', async () => {
      await this.addFirstProduct();
    });
  }

  async addPliegerOnlyProductToCart() {
    logger.info('Adding Plieger Only product to cart');
    await allure.step('Adding Plieger Only product to cart', async () => {
      await this.addFirstProduct();
    });
  }

  async overlappingProductToCart() {
    logger.info('Adding overlapping product to cart');
    await allure.step('Adding overlapping product to cart', async () => {
      await this.addFirstProduct();
    });
  }

  async navigateToPDP() {
    logger.info('Navigating to PDP');
    await allure.step('Navigating to PDP', async () => {
      await this.productLink.click();
    });
  }

  async goToPliegerOnlyProductPDP() {
    logger.info('Going to Plieger Only product PDP');
    await allure.step('Going to Plieger Only product PDP', async () => {
      await this.pliegerOnlyProduct.click();
    });
  }

  async clickProduct() {
    logger.info('Clicking on product');
    await allure.step('Clicking on product', async () => {
      const linkSelector = this.page.locator('.product-tile__header');
      await expect(linkSelector).toBeVisible({ timeout: 5000 });
      await linkSelector.click();
    });
  }

  async addFirstProduct() {
    logger.info('Adding first product to cart');
    await allure.step('Adding first product to cart', async () => {
      await this.firstProductToCart.click();
      await this.page.waitForTimeout(3000);
    });
  }

  async getFirstProductID() {
    logger.info('Getting first product ID');
    await allure.step('Getting first product ID', async () => {
      const productID = await this.firstProductID.innerText();
      return productID;
    });
  }

  async getFirstProductQuantity() {
    logger.info('Getting first product quantity');
    await allure.step('Getting first product quantity', async () => {
      const quantity = await this.firstProductQuantity.innerText();
      return quantity;
    });
  }

  async miniCartItemAmount() {
    logger.info('Getting mini cart item amount');
    await allure.step('Getting mini cart item amount', async () => {
      await this.page.waitForTimeout(2000);
      const amount = await this.minicartAmount.innerText();
      return amount;
    });
  }

  async checkCartContains(addedItemNumber) {
    logger.info('Checking if cart contains added item');
    await allure.step('Checking if cart contains added item', async () => {
      try {
        await this.cartAddPopUp.click();
      } catch {
        logger.info('Cart popup already closed');
      }
      await this.page.click(this.miniCart);
      const itemnr = await this.firstItemIncart.innerText();
      expect(addedItemNumber).toBe(itemnr);
    });
  }

  async checkIfCartEmpty() {
    logger.info('Checking if cart is empty');
    await allure.step('Checking if cart is empty', async () => {
      await this.page.click(this.miniCart);
      await this.page.waitForTimeout(3000);
      await expect(this.emptyCartDiv).toBeVisible();
      await this.page.click(this.minicartOverlay);
    });
  }

  async openCartManagement() {
    logger.info('Opening cart management');
    await allure.step('Opening cart management', async () => {
      await this.page.click(this.miniCart);
    });
  }

  async clickMiniCart() {
    logger.info('Clicking on mini cart');
    await allure.step('Clicking on mini cart', async () => {
      await this.miniCart.click();
    });
  }

  async createNewActiveCart(name) {
    logger.info('Creating new active cart');
    await allure.step('Creating new active cart', async () => {
      await this.createNewCartButton.click();
      await expect(this.newCartName).toBeVisible({ timeout: 40000 });
      await this.newCartName.fill(name, { replace: true, paste: true });
      await expect(this.saveCartName).toBeVisible({ timeout: 40000 });
      await this.saveCartName.click();
      const loaderOverlaySelector = this.page.locator('.c-loader-overlay.c-loader-overlay--loading.c-loader-overlay--tiny');
      try {
        await expect(loaderOverlaySelector).toBeVisible({ timeout: 5000 });
      } catch (error) {
        logger.warn('Loader overlay did not appear as expected. Proceeding with the test.');
      }
      await expect(loaderOverlaySelector).not.toBeVisible({ timeout: 40000 });
    });
  }

  async createNewQuote(name) {
    logger.info('Creating new quote');
    await allure.step('Creating new quote', async () => {
      await this.createNewQuoteButton.click();
      await expect(this.newQuoteName).toBeVisible({ timeout: 40000 });
      await this.newQuoteName.fill(name);
      await this.saveCartName.click();
      const loaderOverlaySelector = this.page.locator('.c-loader-overlay.c-loader-overlay--loading.c-loader-overlay--tiny');
      await expect(loaderOverlaySelector).toBeVisible({ timeout: 10000 });
      await expect(loaderOverlaySelector).not.toBeVisible({ timeout: 40000 });
    });
  }

  async createNewNonActiveCart(name) {
    logger.info('Creating new non-active cart');
    await allure.step('Creating new non-active cart', async () => {
      await this.createNewCartButton.click();
      await this.page.waitForTimeout(3000);
      await this.newCartName.fill(name);
      await this.setCartToActiveBox.click();
      await this.page.waitForTimeout(3000);
      await this.saveCartName.click();
    });
  }

  async isCartActive(name) {
    logger.info('Checking if cart is active');
    await allure.step('Checking if cart is active', async () => {
      await this.page.click(this.miniCart);
      const activeCart = await this.activeCartName.inputValue();
      await expect(activeCart).toContain(name);
      await this.miniCartClose.click();
    });
  }

  async selectCartToAddForNthProduct(name, n) {
    logger.info(`Selecting cart to add for the ${n}th product`);
    await allure.step(`Selecting cart to add for the ${n}th product`, async () => {
      await this.addToOtherCart(n).click();
      const cartNameSelector = this.cartName(name);
      await cartNameSelector.scrollIntoViewIfNeeded();
      await expect(cartNameSelector).toBeVisible({ timeout: 20000 });
      await cartNameSelector.click();
      const loaderOverlaySelector = this.page.locator('.c-loader-overlay.c-loader-overlay--loading.c-loader-overlay--tiny');
      await expect(loaderOverlaySelector).not.toBeVisible({ timeout: 30000 });
    });
  }

  async openOfferteTabProductN(n) {
    logger.info(`Opening offerte tab for the ${n}th product`);
    await allure.step(`Opening offerte tab for the ${n}th product`, async () => {
      await this.page.reload();
      await this.addToOtherCart(n).click();
      await this.quoteTab.click();
    });
  }

  async addToQuote(name) {
    logger.info(`Adding to quote: ${name}`);
    await allure.step(`Adding to quote: ${name}`, async () => {
      await this.quoteName(name).click();
    });
  }

  async addItemToExistingQuote(n) {
    logger.info(`Adding item to existing quote: ${n}`);
    await allure.step(`Adding item to existing quote: ${n}`, async () => {
      const quoteSelector = this.quoteItemsSelector.nth(n);
      await expect(quoteSelector).toBeVisible({ timeout: 40000 });
      await quoteSelector.click();
    });
  }

  async goToQuoteUsingBar() {
    logger.info('Going to quote using bar');
    await allure.step('Going to quote using bar', async () => {
      await this.openQuoteBar.click();
    });
  }

  async switchToCart(name) {
    logger.info('Switching to cart');
    await allure.step('Switching to cart', async () => {
      await this.miniCart.click();
      const activeCart = this.activeCartName;
      const cartOption = activeCart.locator('option');
      await activeCart.click();
      await cartOption.withText(name).click();
    });
  }

  async removeActiveCart() {
    logger.info('Removing active cart');
    await allure.step('Removing active cart', async () => {
      await this.editCart.click();
      await this.editCart.click();
      await this.removeCart.click();
      await this.confirmRemoveCart.click();
      await expect(this.noActiveCartSelected).toBeVisible();
    });
  }

  async removeActiveCartNoCheck() {
    logger.info('Removing active cart without check');
    await allure.step('Removing active cart without check', async () => {
      await this.editCart.click();
      await this.removeCart.click();
      await this.confirmRemoveCart.click();
    });
  }

  async emptyCart() {
    logger.info('Emptying cart');
    await allure.step('Emptying cart', async () => {
      await this.removeFirstCartItem.click();
      await this.minicartOverlay.click();
    });
  }

  async searchTermDisplayed(term) {
    logger.info(`Checking if search term is displayed: ${term}`);
    await allure.step(`Checking if search term is displayed: ${term}`, async () => {
      try {
        await this.page.waitForTimeout(3000);
        const displayedTerm = await this.searchedTerm.innerText();
        logger.info(`Displayed term retrieved: ${displayedTerm}`);
        expect(displayedTerm.trim('"')).toBe(term);
      } catch (error) {
        logger.error(`Error checking if search term is displayed: ${error.message}`);
        throw error;
      }
    });
  }
  

  async goToShoppingCart() {
    logger.info('Going to shopping cart');
    await allure.step('Going to shopping cart', async () => {
      const getURL = this.page.url();
      const cartUrl = await getURL;
      const regex = /^.+?[^\/:](?=[?\/]|$)/g;
      const found = cartUrl.match(regex);
      await this.page.goto(found[0] + "/cart");
    });
  }

  async firstProductNr() {
    logger.info('Getting first product number');
    await allure.step('Getting first product number', async () => {
      return this.firstProductTile.innerText();
    });
  }

  async firstPrice() {
    logger.info('Getting first product price');
    await allure.step('Getting first product price', async () => {
      await this.page.waitForTimeout(2000);
      const amount = await this.priceFieldAmount.nth(0).innerText();
      const fraction = await this.priceFieldFraction.nth(0).innerText();
      return amount + fraction;
    });
  }

  async firstPriceMinicart(label) {
    logger.info(`Getting first price in mini cart with label: ${label}`);
    await allure.step(`Getting first price in mini cart with label: ${label}`, async () => {
      if (label === "Bruto") {
        return this.priceFieldMinicartBruto.nth(0).innerText();
      }
      if (label === "Netto") {
        return this.priceFieldMinicartNetto.nth(0).innerText();
      }
    });
  }

  async changePricesShown(label) {
    logger.info(`Changing prices shown to: ${label}`);
    await allure.step(`Changing prices shown to: ${label}`, async () => {
      await this.priceBNGSelector.click();
      if (label === "Bruto") {
        await this.priceBNGOption.withText("Bruto").click();
      } else if (label === "Netto") {
        await this.page.waitForTimeout(3000);
        await this.priceBNGOption.withText("Netto").click();
      } else {
        await this.priceBNGOption.withText("Geen").click();
      }
    });
  }

  async addFirstProductToCustomFav(list) {
    logger.info(`Adding first product to custom favorite list: ${list}`);
    await allure.step(`Adding first product to custom favorite list: ${list}`, async () => {
      await this.firstProductToFavManage.click();
      await this.addToListFav.click();
      await this.checkboxFavoriteList(list).click();
    });
  }

  async goToFavorites() {
    logger.info('Going to favorites');
    await allure.step('Going to favorites', async () => {
      await this.favoritesIcon.click();
    });
  }

  async closeFavModal() {
    logger.info('Closing favorite modal');
    await allure.step('Closing favorite modal', async () => {
      await this.closeModal.click();
    });
  }

  async closeNewCartModal() {
    logger.info('Closing new cart modal');
    await allure.step('Closing new cart modal', async () => {
      await this.closeModal.click();
    });
  }

  async clickOnClassificationFilter(filterValue) {
    logger.info(`Clicking on classification filter with value: ${filterValue}`);
    await allure.step(`Clicking on classification filter with value: ${filterValue}`, async () => {
      const filterLocator = this.classificationFilter(filterValue);
      const count = await filterLocator.count();
      if (count === 1) {
        await filterLocator.click();
      } else {
        logger.error(`Expected one element, but found ${count} elements for filter: ${filterValue}`);
        throw new Error(`Expected one element, but found ${count} elements for filter: ${filterValue}`);
      }
    });
  }

  dynamicFilter(filterValue) {
    return this.page.locator(`div.c-checkbox.c-select-filter--checkbox input[type="checkbox"][value="${filterValue}"]`).locator('..');
  }

async clickOnDynamicFilter(filterValue) {
    logger.info(`Clicking on dynamic filter with value: ${filterValue}`);
    return await allure.step(`Clicking on dynamic filter with value: ${filterValue}`, async () => {
        // Locate the correct filter checkbox wrapper
        const filterCheckboxWrapper = this.page.locator(`div.c-checkbox.c-select-filter--checkbox input[type="checkbox"][value="${filterValue}"]`).locator('..');
        
        // Further refine to get the correct label by filtering within the parent
        const filterLabel = filterCheckboxWrapper.locator(`label[for="${filterValue.toLowerCase()}subBrand"], label:has-text("${filterValue}")`).first();

        // Ensure the label is visible
        await expect(filterLabel).toBeVisible({ timeout: 10000 });

        // Click the label element to check the checkbox
        for (let i = 0; i < 3; i++) {
            try {
                await filterLabel.scrollIntoViewIfNeeded();
                await filterLabel.click({ timeout: 5000 });
                await this.page.waitForTimeout(1000); // Wait for the UI to update

                if (await this.filterFacetChip(filterValue).isVisible({ timeout: 5000 })) {
                    logger.info(`Clicked on dynamic filter with value: ${filterValue}`);
                    return;
                }
            } catch (error) {
                logger.warn(`Attempt ${i + 1} to click on dynamic filter with value: ${filterValue} failed. Error: ${error.message}`);
            }
        }

        logger.error(`Failed to click on dynamic filter with value: ${filterValue} after multiple attempts`);
        throw new Error(`Failed to click on dynamic filter with value: ${filterValue} after multiple attempts`);
    });
}


  async clickOnMoreOfFilter(filterName) {
    logger.info(`Clicking on more of filter with name: ${filterName}`);
    await allure.step(`Clicking on more of filter with name: ${filterName}`, async () => {
      const parentSection = this.filterSection(filterName).locator('..').locator('..');
      await parentSection.locator('.collapse-box__more-button span').click();
    });
  }

  async clickOnToonMeerButton() {
    logger.info('Clicking on Toon Meer button');
    await allure.step('Clicking on Toon Meer button', async () => {
      await this.toonMeerButton.click();
    });
  }

  async clickOnToonMeerSerieButton() {
    logger.info('Clicking on Toon Meer Serie button');
    await allure.step('Clicking on Toon Meer Serie button', async () => {
      await this.toonMeerSerieButton.click();
    });
  }

  async clickOnOverlappingProduct() {
    logger.info('Clicking on overlapping product');
    await allure.step('Clicking on overlapping product', async () => {
      await this.olProduct.click();
    });
  }

  async clickOnOverlappingProductOnPDP() {
    logger.info('Clicking on overlapping product on PDP');
    await allure.step('Clicking on overlapping product on PDP', async () => {
      await this.alternativeProductLink.click();
    });
  }

  async clickShoppingCartButton() {
    logger.info('Clicking on shopping cart button');
    await allure.step('Clicking on shopping cart button', async () => {
      await this.page.waitForTimeout(3000);
      await this.cartButton.click();
    });
  }

  async clickOnFlyIn() {
    logger.info('Clicking on fly-in');
    await allure.step('Clicking on fly-in', async () => {
      await this.openFlyIn.click();
    });
  }

  async clickOnGC24Variant() {
    logger.info('Clicking on GC24 variant');
    await allure.step('Clicking on GC24 variant', async () => {
      await this.clickOnGC24VariantButton.click();
    });
  }

  async verifyFilter(filterValue) {
    logger.info(`Verifying filter with value: ${filterValue}`);
    await allure.step(`Verifying filter with value: ${filterValue}`, async () => {
        const filterChipLocator = this.filterFacetChip(filterValue);
        try {
            logger.info(`Waiting for filter chip with value: ${filterValue} to be visible`);
            await filterChipLocator.waitFor({ state: 'visible', timeout: 10000 });
            await expect(filterChipLocator).toBeVisible({ timeout: 10000 });
            logger.info(`Filter chip with value: ${filterValue} is visible`);

            const resultsInPagination = await this.getResultsFromPaginationHeader();
            logger.info(`Results in pagination header: ${resultsInPagination}`);

            let nrOfResults = '';
            if (filterValue !== 'Wastafel') {
                const amountLocator = this.dynamicFilter(filterValue).locator('.checkbox-label--amount');
                await amountLocator.waitFor({ state: 'visible', timeout: 10000 });
                nrOfResults = (await amountLocator.textContent()).trim();
                nrOfResults = nrOfResults.replace(/[^\d]/g, '');
            } else {
                const countLocator = this.classificationFilter(filterValue).locator('.menu-item__count');
                await countLocator.waitFor({ state: 'visible', timeout: 10000 });
                nrOfResults = (await countLocator.textContent()).trim();
                nrOfResults = nrOfResults.replace(/[^\d]/g, '');
            }

            logger.info(`Number of results for filter ${filterValue}: ${nrOfResults}`);
            expect(resultsInPagination).toContain(nrOfResults);
        } catch (error) {
            logger.error(`Failed to verify filter with value: ${filterValue} due to: ${error.message}`);
            throw error;
        }
    });
}


  async getResultsFromPaginationHeader() {
    logger.info('Getting results from pagination header');
    return await allure.step('Getting results from pagination header', async () => {
      try {
        await this.page.waitForTimeout(5000);
        logger.info('Waiting for the pagination number element to be visible');
        await expect(this.numberOfProducts).toBeVisible({ timeout: 15000 });
        const textContent = await this.numberOfProducts.textContent();
        logger.info(`Text content retrieved is: ${textContent}`);
        return textContent;
      } catch (error) {
        logger.error(`Error getting results from pagination header: ${error.message}`);
        throw error;
      }
    });
  }
  
  

  async countFacets(expectedNumber) {
    logger.info(`Counting facets, expected number: ${expectedNumber}`);
    await allure.step(`Counting facets, expected number: ${expectedNumber}`, async () => {
      const facetChipsCount = await this.filterFacetChips.count();
      let filterCount = 0;
  
      if (facetChipsCount > 0) {
        await expect(this.filterFacetChips).toBeVisible();
        const filterText = await this.filterFacetChips.first().textContent();
        const matches = filterText.match(/\((\d+)\)/);
        filterCount = matches ? parseInt(matches[1]) : 0;
      }
  
      expect(filterCount).toBe(expectedNumber);
      logger.info(`Actual number of facets: ${filterCount}, Expected number of facets: ${expectedNumber}`);
    });
  }
  

  async clearFilter(filterValue) {
    logger.info(`Clearing filter with value: ${filterValue}`);
    await allure.step(`Clearing filter with value: ${filterValue}`, async () => {
      await this.filterFacetChip(filterValue).click();
    });
  }

  async clickOnQuickFilter(filterValue) {
    logger.info(`Clicking on quick filter with value: ${filterValue}`);
    await allure.step(`Clicking on quick filter with value: ${filterValue}`, async () => {
      await this.quickFilter(filterValue).click();
    });
  }

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
    const expectedMessage = ProductListPage.getExpectedDeliveryPromiseForGC24only();
    const fulfilmentMessageText = this.page.locator('span.fulfilment-message__text');
    logger.info(`Expected delivery promise message for GC24 only product on the PLP is: ${expectedMessage}`);
    await allure.step('Verifying delivery message for GC24 only product', async () => {
      await expect(fulfilmentMessageText).toContainText(expectedMessage);
    });
  }

  async assertGC24deliveryPromiseMessage() {
    const expectedMessage = ProductListPage.getExpectedDeliveryPromiseForGC24only();
    const secondFulfilmentMessageText = this.page.locator('span.fulfilment-message__text').nth(0);
    logger.info(`Expected delivery promise message for GC24 only product on the mini shopping cart page is: ${expectedMessage}`);
    await allure.step('Asserting GC24 delivery promise message', async () => {
      await expect(secondFulfilmentMessageText).toHaveText(expectedMessage, { timeout: 10000 });
    });
  }

  static getExpectedDeliveryMessage() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = now.getHours(); // 0 to 23

    // Messages based on the day of the week and time
    const deliveryMessages = {
      beforeCutoff: {
        0: "Nu besteld, dinsdag geleverd", // Sunday
        1: "Voor 21:00 uur besteld, dinsdag geleverd", // Monday
        2: "Voor 21:00 uur besteld, woensdag geleverd", // Tuesday
        3: "Voor 21:00 uur besteld, donderdag geleverd", // Wednesday
        4: "Voor 21:00 uur besteld, vrijdag geleverd", // Thursday
        5: "Voor 21:00 uur besteld, maandag geleverd", // Friday
        6: "Nu besteld, dinsdag geleverd" // Saturday
      },
      afterCutoff: {
        0: "Nu besteld, dinsdag geleverd", // Sunday
        1: "Voor 21:00 uur besteld, woensdag geleverd",
        2: "Voor 21:00 uur besteld, donderdag geleverd",
        3: "Voor 21:00 uur besteld, vrijdag geleverd",
        4: "Voor 21:00 uur besteld, maandag geleverd",
        5: "Nu besteld, dinsdag geleverd",
        6: "Nu besteld, dinsdag geleverd"
      }
    };

    // Select the appropriate message based on the current time
    if (hour < 21) {
      return deliveryMessages.beforeCutoff[dayOfWeek];
    } else {
      return deliveryMessages.afterCutoff[dayOfWeek];
    }
  }

  async assertPliegerDeliveryPromiseMessage() {
    const expectedMessage = ProductListPage.getExpectedDeliveryMessage();
    const fulfilmentMessageText = this.page.locator('span.fulfilment-message__text').nth(1);
    logger.info(`Expected delivery message for the Plieger only product on the mini shopping cart page is: "${expectedMessage}"`);
    await allure.step('Asserting Plieger delivery promise message', async () => {
      await expect(fulfilmentMessageText).toHaveText(expectedMessage, { timeout: 10000 });
    });
  }
}

module.exports = ProductListPage;
