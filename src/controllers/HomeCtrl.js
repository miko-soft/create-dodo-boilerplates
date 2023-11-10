import { Controller, corelib } from '@mikosoft/dodo';
import navbar from '../views/inc/navbar.html?raw';
import homeMain from '../views/pages/home/main.html?raw';
import footer from '../views/inc/footer.html?raw';



export default class HomeCtrl extends Controller {

  constructor(app) {
    super();
  }

  async __loader(trx) {
    this.setTitle('DoDo - Single Page App Framework');
    this.setDescription('DoDo is JS framework for single page applications.');
    this.setKeywords('dodo, framework, javascript, js, single page app, spa');
    this.setLang('en');
    this.loadView('#navbar', navbar);
    this.loadView('#main', homeMain);
    this.loadView('#footer', footer);
  }

  async __init(trx) {
    console.log(this);
    console.log('DODO_API_BASE::', import.meta.env.DODO_API_BASE);
    this.ipcRenderer = window.ipcRenderer;
    await this.listenElectronMain();
  }

  // if rend() is not defined then this.render() is used
  // async __rend(trx) {
  //   console.log('rend() -- trx::', trx);
  //   await this.ddUNLISTEN();
  //   this.ddHref();
  // }

  async __postrend(trx) {
    // console.log('postrend() -- trx::', trx);
  }

  async __destroy() {
    console.log('destroy() -- navig::', corelib.navig);
    console.log('destroy() -- ctrl::', this);
    this.unloadCSS(['https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism-coy.min.css']);
    this.unloadJS();
  }


  async listenElectronMain() {
    this.ipcRenderer.once('versions-info', (event, processes) => {
      this.$fridge.processes = [];
      for (const [name, ver] of Object.entries(processes)) {
        this.$fridge.processes.push({ name, ver });
        // console.log(`${name}: ${ver}`);
      }
    });
    await new Promise(r => setTimeout(r, 400));
  }

}
