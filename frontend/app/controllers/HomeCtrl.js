import { Controller, corelib } from '@mikosoft/dodo';

export default class HomeCtrl extends Controller {

  constructor(app) {
    super();
  }

  async loader(trx) {
    this.setTitle('DoDo - JS Single Page App Framework');
    this.setDescription('DoDo is JS framework for single page applications which runs in a browser.');
    this.setKeywords('dodo, framework, javascript, js, single page app, spa');
    this.setLang('en');
    await this.loadView('#main', 'pages/home/main.html');
  }


  async init(trx) {
    console.log('init() -- trx::', trx);
    console.log('init() -- navig::', corelib.navig);
    console.log('init() -- ctrl::', this);
    this.something = 'smthng';
  }

  // if rend() is not defined then this.render() is used
  async rend(trx) {
    console.log('rend() -- trx::', trx);
    await this.ddKILL();
    this.ddHref();
  }

  async postrend(trx) {
    console.log('postrend() -- trx::', trx);
  }

  async destroy(trx) {
    console.log('destroy() -- trx::', trx);
    console.log('destroy() -- navig::', corelib.navig);
    console.log('destroy() -- ctrl::', this);
    this.unloadCSS(['https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism-coy.min.css']);
    this.unlazyJS();
  }

}
