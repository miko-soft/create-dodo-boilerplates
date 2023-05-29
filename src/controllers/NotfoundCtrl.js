import { Controller } from '@mikosoft/dodo';
import navbar from '../views/inc/navbar.html?raw';
import notfoundMain from '../views/pages/notfound/main.html?raw';
import footer from '../views/inc/footer.html?raw';



export default class NotfoundCtrl extends Controller {

  async __loader(trx) {
    this.setTitle('DoDo - NOT FOUND');
    await this.loadView('#navbar', navbar);
    await this.loadView('#main', notfoundMain);
    await this.loadView('#footer', footer);
  }

  async __postrend(trx) {
    // console.error(`404 not found: ${trx.uri}`);
    this.$model.uri = trx.uri;
  }

}
