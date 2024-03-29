import { App } from '@mikosoft/dodo';

// conf
import { $auth, $httpClient, $debugOpts } from './conf/index.js';

// controllers
import HomeCtrl from './controllers/HomeCtrl.js';
import Page1Ctrl from './controllers/Page1Ctrl.js';
import NotfoundCtrl from './controllers/NotfoundCtrl.js';


const $routes = [
  ['when', '/', HomeCtrl],
  ['when', '/page1', Page1Ctrl],
  ['notfound', NotfoundCtrl]
];

// app
const app = new App('myDodoApp');
app
  .auth($auth)
  .httpClient($httpClient)
  .debug($debugOpts);

app
  .routes($routes)
  .listen();


