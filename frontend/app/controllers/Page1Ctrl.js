import { Controller } from '@mikosoft/dodo';

export default class Page1Ctrl extends Controller {

  constructor(app) {
    super();
  }

  async __loader(trx) {
    this.setTitle('Page1');
    this.setDescription('DoDo is JS framework for single page applications which runs in a browser.');
    this.setKeywords('dodo, framework, javascript, js, single page app, spa');
    this.setLang('en');
    await this.loadView('#navbar', 'inc/navbar.html');
    await this.loadView('#main', 'pages/page1/main.html');
    await this.loadView('#footer', 'inc/footer.html');
  }

}
