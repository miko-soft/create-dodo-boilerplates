/**
 * file: Doller.js
 * This script (Doller.js) runs in the chrome extension background and sending instructions to doll.js.
 * Doller.js and doll.js provides Puppeteer-like functionality within a Chrome extension
 */
class Doller {
  constructor(tabId) {
    console.log('The Doller is initiated.');
    this.tabId = tabId;
  }

  /**
   * Creates a new Doller page instance for the currently active tab.
   * @returns {Promise<Doller>} A Promise that resolves with a new Doller instance.
   */
  static async createPage() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tabs || !tabs[0] || !tabs[0].id) {
      throw new Error('No active tab found.');
    }
    return new Doller(tabs[0].id);
  }


  /*** Navigation & Page Control ***/
  /*********************************/
  /**
   * Navigates the tab to the given URL.
   * @param {string} url - The URL to navigate to.
   * @returns {Promise<void>} A Promise that resolves when the navigation is acknowledged. - {success, msg, data, err, act: 'goto'}
   */
  async goto(url) {
    try {
      // await chrome.tabs.update(this.tabId, { url }); // navigate an existing tab (with this.tabId) to a new URL (reload page) - NOT REQUIRED
      await this._sendDollInstruction({ action: 'goto', url });
      await this.waitForTabLoad();
    } catch (err) { }
  }


  /**
   * Navigates the tab back in its history.
   * @returns {Promise<void>} A Promise that resolves when the navigation is successful.
   */
  async back() {
    try {
      // await chrome.tabs.update(this.tabId, { url }); // navigate an existing tab (with this.tabId) to a new URL (reload page) - NOT REQUIRED
      await this._sendDollInstruction({ action: 'back' });
      await this.waitForTabLoad();
    } catch (err) { }
  }


  /**
   * Waits for a CSS selector to appear in the page.
   * @param {string} cssSel - The CSS selector to wait for.
   * @param {number} [timeout=30000] - The timeout in milliseconds.
   * @returns {Promise<string>} A Promise that resolves when the selector appears.
   */
  async waitForSelector(cssSel, timeout = 30000) {
    return this._sendDollInstruction({ action: 'waitForSelector', cssSel, timeout });
  }


  /**
   * Waits for the tab associated with this Doller instance to finish loading.
   * This function listens for the 'complete' status of the tab's loading process and resolves the Promise when the tab is fully loaded.
   * It also removes the listener after the tab has loaded to prevent memory leaks.
   * @returns {Promise<void>} A Promise that resolves when the tab is loaded.
   */
  async waitForTabLoad() {
    return new Promise((resolve) => {
      const listener = (tabId, changeInfo) => {
        if (tabId === this.tabId && changeInfo.status === 'complete') {
          chrome.tabs.onUpdated.removeListener(listener);
          resolve();
        }
      };
      chrome.tabs.onUpdated.addListener(listener);
    });
  }


  /*** Content & Info ***/
  /**********************/
  /**
   * Gets the current URL of the page.
   * @returns {Promise<string>} A Promise that resolves with the current URL.
   */
  async url() {
    return this._sendDollInstruction({ action: 'url' });
  }

  /**
   * Gets the HTML content of the page.
   * @returns {Promise<string>} A Promise that resolves with the HTML content.
   */
  async content() {
    return this._sendDollInstruction({ action: 'content' });
  }

  /**
   * Checks if an element matching the given selector exists on the page.
   * @param {string} selector - The CSS selector of the element to check.
   * @returns {Promise<boolean>} A Promise that resolves with true if the element exists, false otherwise.
   */
  async hasSelector(selector) {
    return this._sendDollInstruction({ action: 'hasSelector', selector });
  }


  /*** Interaction ***/
  /*******************/
  /**
   * Clicks on an element matching the given selector.
   * @param {string} selector - The CSS selector of the element to click.
   * @returns {Promise<string>} A Promise that resolves when the click is successful.
   */
  async click(selector) {
    return this._sendDollInstruction({ action: 'click', selector });
  }

  /**
   * Types text into an element matching the given selector.
   * @param {string} selector - The CSS selector of the element to type into.
   * @param {string} text - The text to type.
   * @param {object} [options={}] - Optional parameters.
   * @param {number} [options.delay] - The delay in milliseconds between typing each character.
   * @returns {Promise<string>} A Promise that resolves when the text is typed.
   */
  async type(selector, text, options = {}) {
    return this._sendDollInstruction({ action: 'type', selector, text, options });
  }

  /**
   * Selects options in a select element.
   * @param {string} selector - The CSS selector of the select element.
   * @param {...string} values - The values or text of the options to select.
   * @returns {Promise<string>} A Promise that resolves when the options are selected.
   */
  async select(selector, ...values) {
    return this._sendDollInstruction({ action: 'select', selector, values });
  }



  /*** Evaluation ***/
  /*******************/
  /* TODO
  await page.evaluate(fn, ...args)
  */



  /*** HELPERS ***/
  /***************/
  /**
   * Sends a message to the content script and returns a Promise.
   * @param {object} message - The message to send.
   * @param {object} [options] - Optional parameters for chrome.tabs.sendMessage.
   * @returns {Promise<any>} A Promise that resolves with the response from the content script.
   */
  async _sendDollInstruction(message, options) {
    if (!this.tabId) { throw new Error('Doller: No tab ID available.'); }

    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(this.tabId, message, options, (response) => {
        console.log('   (Doller.js)response:', response);
        console.log('   (Doller.js)chrome.runtime.lastError:', chrome.runtime.lastError);
        if (chrome.runtime.lastError) { reject(`   (Doller.js)chrome.runtime.lastError: ${chrome.runtime.lastError} on action "${message.action}"`); }
        else if (response.includes('ERROR')) { reject(`   (Doller.js) error from doll.js: ${response} on action "${message.action}"`); }
        else { resolve(response); }
      });
    });
  }


}

export default Doller;
