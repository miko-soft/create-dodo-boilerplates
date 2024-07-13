import { Controller, corelib } from '@mikosoft/dodo';
import nav from '/action/views/nav.html?raw';
import main from '/action/views/main.html?raw';

export default class PopupCtrl extends Controller {

  constructor(app) {
    super();
  }

  async __loader(trx) {
    this.setTitle('Action PopUp');
    this.setLang('en');
    this.loadView('#nav', nav);
    this.loadView('#main', main);
  }

  async __init(trx) {
    this.$model.infoMsg = '';
  }


  async callAPIendpoint() {
    const message = {
      route: '/api/getone',
      payload: 'https://jsonplaceholder.typicode.com/posts/1'
    };
    const response = await this._sendMsg(message);
    this._showInfoMsg(response);
  }




  /******************************* MESSAGES *******************************/
  /************************************************************************/
  /**
   * Send message to the background with:
   * - chrome.runtime.sendMessage(extensionId?, message, options?, callback?) --> https://developer.chrome.com/docs/extensions/reference/api/runtime#method-sendMessage
   * or content_scripts using:
   * - chrome.tabs.sendMessage(tabId, message, options?, callback?) --> https://developer.chrome.com/docs/extensions/reference/api/tabs#method-sendMessage
   * @param {'background'|'content_scripts'} destination
   * @param {string} message - {route:string, payload:any}
   * @returns {Promise<string>}
  */
  async _sendMsg(message, destination = 'background') {
    try {
      let response;
      if (destination === 'background') {
        response = await chrome.runtime.sendMessage(message);
      } else if (destination === 'content_scripts') {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        const activeTab = tabs[0]; // Query for the active tab in the current window
        response = await chrome.tabs.sendMessage(activeTab.id, message);
      }
      return response;
    } catch (error) {
      console.error('_sendMsgERR::', error);
    }
  }


  async _showInfoMsg(msg) {
    this.$model.infoMsg = msg;
    await corelib.util.sleep(3400);
    this.$model.infoMsg = '';
  }



}
