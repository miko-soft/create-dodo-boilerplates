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
    this.setLang('en');
    this.loadView('#navbar', navbar);
    this.loadView('#main', page1Main);
    this.loadView('#footer', footer);
  }

}
