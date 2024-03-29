import { Controller } from '@mikosoft/dodo';
import navbar from '../views/inc/navbar.html?raw';
import page1Main from '../views/pages/page1/main.html?raw';
import footer from '../views/inc/footer.html?raw';



export default class Page1Ctrl extends Controller {

  constructor(app) {
    super();
  }

  async __loader(trx) {
    this.setTitle('Page 1');
    this.setDescription('DoDo is JS framework for single page applications which runs in a browser.');
    this.setKeywords('dodo, framework, javascript, js, single page app, spa');
    this.setLang('en');
    this.loadView('#navbar', navbar);
    this.loadView('#main', page1Main);
    this.loadView('#footer', footer);
  }

}
