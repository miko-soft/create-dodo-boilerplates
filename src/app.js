import { AppOne, Controller, corelib } from '@mikosoft/dodo';
import { $httpClient, $debugOpts } from './conf/index.js';


// controller
class HomeCtrl extends Controller {

  constructor(app) {
    super();
  }

  // trx argument is undefined because there's no router
  async __loader() {
    this.setTitle('AppOne - DoDo Framework');
    this.setDescription('DoDo is JS framework for one page applications.');
    this.setKeywords('dodo, framework, javascript, js, single page app, spa');
    this.setLang('en');
    this.loadSelfview();
  }

  async __init() {
    console.log('init() -- ctrl::', this);
    await this.fetchPosts();
  }

  async __postrend() {
  }

  async fetchPosts() {
    const answer = await this.$httpClient.askJSON('https://jsonplaceholder.typicode.com/posts');
    this.$model.posts = answer.res.content || [];
  }

}


// app
const appOne = new AppOne('myDodoAppOne');
appOne
  .httpClient($httpClient)
  .debug($debugOpts)
  // .i18n()
  .controller(HomeCtrl);


