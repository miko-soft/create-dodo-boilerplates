import 'bootstrap'; // import bootstrap.js
import { AppOne } from '@mikosoft/dodo';
import { Controller, corelib } from '@mikosoft/dodo';
import ChromeStorage from '../_libs/ChromeStorage.js';

// controller
export default class OptionsCtrl extends Controller {

  constructor(app) {
    super();
  }

  async __loader(trx) {
    this.setTitle('Options');
    this.setLang('en');
  }

  async __init(trx) {
    this.$model.okMsg = '';
    this.optionsForm = new corelib.Form('optionsForm');
    this.chromeStorage = new ChromeStorage('local');
    this.fillOptionsForm();
  }


  saveOptions() {
    const options = this.optionsForm.getControls(['opt1', 'opt2', 'opt3', 'opt4', 'opt5']);
    this.chromeStorage.set(options);
    this._showMsg('Options are saved', 3400);
  }

  async fillOptionsForm() {
    const options = await this.chromeStorage.get(['opt1', 'opt2', 'opt3', 'opt4', 'opt5']) || {};
    this.optionsForm.setControls(options);
  }


  async _showMsg(msg, ms) {
    this.$model.okMsg = msg;
    await corelib.util.sleep(ms);
    this.$model.okMsg = '';
  }

}



// app
const appOne = new AppOne('ChromeExtensionOptions');
appOne.controller(OptionsCtrl);
