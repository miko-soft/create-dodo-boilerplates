import { Controller, corelib } from '@mikosoft/dodo';
import navbar from '../views/inc/navbar.html?raw';
import mainHome from '../views/pages/mainHome.html?raw';
import mainPage1 from '../views/pages/mainPage1.html?raw';
import footer from '../views/inc/footer.html?raw';



export default class HomeCtrl extends Controller {

  constructor(app) {
    super();
  }

  // trx argument is undefined because there's no router
  async __loader() {
    this.setTitle('DoDo - App One');
    this.setDescription('DoDo is JS framework for single page applications.');
    this.setKeywords('dodo, framework, javascript, js, single page app, spa');
    this.setLang('en');
    this.loadView('#navbar', navbar);
    this.loadView('#main', mainHome);
    this.loadView('#footer', footer);
  }

  async __init() {
    console.log('init() -- ctrl::', this);
  }

  async __postrend() {
  }


  openView(viewName) {
    // this.emptyView('#main');
    if (viewName === 'home') {
      this.loadView('#main', mainHome);
    } else if (viewName === 'page1') {
      this.loadView('#main', mainPage1);
      this.fetchPosts();
    }

  }

  async fetchPosts() {
    const answer = await this.$httpClient.askJSON('https://jsonplaceholder.typicode.com/posts');
    this.$model.posts = answer.res.content || [];
  }

}
