/**
   * Send message to the background with:
   * - chrome.runtime.sendMessage(extensionId?, message, options?, callback?) --> https://developer.chrome.com/docs/extensions/reference/api/runtime#method-sendMessage
   * or content_scripts using:
   * - chrome.tabs.sendMessage(tabId, message, options?, callback?) --> https://developer.chrome.com/docs/extensions/reference/api/tabs#method-sendMessage
   * @param {'action'|'background'|'content_scripts'} destination
   * @param {string} message - {route:string, payload:any}
   * @returns {Promise<string>}
  */
const sendMsg = async (message, destination) => {
  if (!destination) { throw new Error('messengerERR: The destination is not defined.'); }
  try {
    let response;
    if (destination === 'action' || destination === 'background') {
      response = await chrome.runtime.sendMessage(message);
    } else if (destination === 'content_scripts') {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const activeTab = tabs[0]; // Query for the active tab in the current window
      if (!activeTab?.id) { throw new Error('messengerERR: No active tab ID found.'); }
      response = activeTab.id ? await chrome.tabs.sendMessage(activeTab.id, message) : undefined;
    }

    if (chrome.runtime.lastError) { throw new Error(chrome.runtime.lastError); }
    else { return response; }
  } catch (error) {
    console.error('messengerERR::', error, message);
  }
};


/**
 * Listen for chrome messages.
 * @param {Function} cb - Callback function to handle messages.
 */
const listenMsgs = (cb) => {
  if (typeof cb !== 'function') {
    throw new Error('messengerERR: Callback must be a function.');
  }
  chrome.runtime?.onMessage.addListener(cb);
};


/**
 * Stop listening for chrome messages.
 * @param {Function} cb - Callback function to remove.
 */
const unlistenMsgs = (cb) => {
  if (typeof cb !== 'function') {
    throw new Error('messengerERR: Callback must be a function.');
  }
  chrome.runtime?.onMessage.removeListener(cb);
};



const messenger = { sendMsg, listenMsgs, unlistenMsgs };
export default messenger;
