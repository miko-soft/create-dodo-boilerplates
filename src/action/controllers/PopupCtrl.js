import { Controller, corelib } from '@mikosoft/dodo';
import nav from '/action/views/nav.html?raw';
import main from '/action/views/main.html?raw';
import messenger from '../../_libs/messenger.js';
import ChromeStorage from '../../_libs/ChromeStorage.js';

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

    messenger.listenMsgs((message, sender, sendResponse) => {
      // console.log('message:::', message);
      // console.log('sender:::', sender);
      const route = message.route;
      const payload = message.payload;

      if (route.includes('/action/showmessage'))
        this._showInfoMsg(payload);
    });

    this.chromeStorage = new ChromeStorage('local');

    this.dodoApp_url = chrome.runtime.getURL('/dodoApp/index.html');
  }


  async callAPIendpoint() {
    const message = {
      route: '/background/service_worker/api-getone',
      payload: 'https://jsonplaceholder.typicode.com/posts/1'
    };
    const response = await messenger.sendMsg(message, 'background');
    this._showInfoMsg(response);
  }


  async changeBackgroundColor() {
    const message = {
      route: '/content_scripts/foreground/change-background-color',
      payload: this.bkgColor // green, red, orange
    };
    const response = await messenger.sendMsg(message, 'content_scripts');
    this._showInfoMsg(response);
  }


  async showOptions() {
    const options = await this.chromeStorage.get(['opt1', 'opt2', 'opt3', 'opt4', 'opt5']);
    console.log('showOptions::', options);
    this._showInfoMsg(JSON.stringify(options));
  }


  async _showInfoMsg(msg) {
    this.$model.infoMsg = msg;
    await corelib.util.sleep(3400);
    this.$model.infoMsg = '';
  }


}
