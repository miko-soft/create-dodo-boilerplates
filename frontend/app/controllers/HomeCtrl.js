import { Controller, corelib } from '@mikosoft/dodo';

export default class HomeCtrl extends Controller {

  constructor(app) {
    super();
  }

  async __loader(trx) {
    this.setTitle('DoDo - Single Page App Framework');
    this.setDescription('DoDo is JS framework for single page applications.');
    this.setKeywords('dodo, framework, javascript, js, single page app, spa');
    this.setLang('en');
    await this.loadView('#main', 'pages/home/main.html');
  }

  async __init(trx) {
    console.log('init() -- trx::', trx);
    console.log('init() -- navig::', corelib.navig);
    console.log('init() -- ctrl::', this);
    this.something = 'smthng';
  }

  // if rend() is not defined then this.render() is used
  // async __rend(trx) {
  //   console.log('rend() -- trx::', trx);
  //   await this.ddUNLISTEN();
  //   this.ddHref();
  // }

  async __postrend(trx) {
    console.log('postrend() -- trx::', trx);
  }

  async __destroy() {
    console.log('destroy() -- navig::', corelib.navig);
    console.log('destroy() -- ctrl::', this);
    this.unloadCSS(['https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism-coy.min.css']);
    this.unlazyJS();
  }

}
