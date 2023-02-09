import { Controller } from '@mikosoft/dodo';


export default class NotfoundCtrl extends Controller {

  async loader(trx) {
    this.setTitle('DoDo - NOT FOUND');
    await this.loadView('#main', 'pages/notfound/main.html');
  }

  async postrend(trx) {
    // console.error(`404 not found: ${trx.uri}`);
    this.$model.uri = trx.uri;
  }

}
