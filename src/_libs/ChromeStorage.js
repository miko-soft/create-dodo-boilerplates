/**
 * Convert chrome.storage to async functions.
 */
export default class ChromeStorage {

  /**
   * @param {string} storageType - local, session, sync, managed - https://developer.chrome.com/docs/extensions/reference/api/storage#property-sync
   */
  constructor(storageType = 'local') {
    if (!chrome.storage) { throw new Error('The chrome.storage is not defined. Check if you are running this script out of chrome browser environment.'); }
    this.storageType = storageType;
  }


  /**
   * Get the storage values.
   * @param {string[]} keys - array of chrome storage keys: ['name', 'age']
   * @returns {Promise<object>}
   */
  get(keys) {
    return new Promise((resolve, reject) => {
      chrome.storage[this.storageType].get(keys, (storageObj) => {
        if (!storageObj) { reject(new Error('No storageObj')); }
        resolve(storageObj);
      });
    });
  }


  /**
   * Get the storage values.
   * @param {object} keyValObj - object with key:val: {name, 'John'}
   * @returns {Promise<void>}
   */
  set(keyValObj) {
    return new Promise((resolve, reject) => {
      chrome.storage[this.storageType].set(keyValObj, () => {
        resolve();
      });
    });
  }


}
