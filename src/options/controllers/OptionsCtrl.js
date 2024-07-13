import { Controller, corelib } from '@mikosoft/dodo';
import options from '/options/views/options.html?raw';

export default class OptionsCtrl extends Controller {

  constructor(app) {
    super();
  }

  async __loader(trx) {
    this.setTitle('Options');
    this.setLang('en');
    this.loadView('#options', options);
  }

  async __init(trx) {
  }

  async __postrend(trx) {
  }

  async __destroy() {
  }

}
