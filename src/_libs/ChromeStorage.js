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


  /**
   * Store an array of objects in chrome.storage.
   * @param {string} key - The key under which the array is stored.
   * @param {Array<object>} arr - The array of objects to store.
   * @returns {Promise<void>}
   */
  setArray(key, arr) {
    return new Promise((resolve, reject) => {
      if (typeof key !== 'string' || !Array.isArray(arr)) {
        return reject(new Error('Invalid arguments: expected (string, array)'));
      }

      chrome.storage.local.set({ [key]: arr }, () => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve();
      });
    });
  }


  /**
   * Retrieve an array of objects from chrome.storage.
   * @param {string} key - The key under which the array is stored.
   * @returns {Promise<Array<object>>}
   */
  getArray(key) {
    return new Promise((resolve, reject) => {
      if (typeof key !== 'string') {
        return reject(new Error('Invalid argument: key must be a string'));
      }

      chrome.storage.local.get([key], (result) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }

        const data = result[key];
        if (Array.isArray(data)) {
          resolve(data);
        } else {
          resolve([]); // Return empty array if not found or not an array
        }
      });
    });
  }


}
