import { App } from '@mikosoft/dodo';

// conf
import { $viewsCached, $auth, $httpClient, $debugOpts } from './app/conf/index.js';

// controllers
import HomeCtrl from './app/controllers/HomeCtrl.js';
import Page1Ctrl from './app/controllers/Page1Ctrl.js';
import NotfoundCtrl from './app/controllers/NotfoundCtrl.js';


const $routes = [
  ['when', '/', HomeCtrl],
  ['when', '/page1', Page1Ctrl],
  ['notfound', NotfoundCtrl]
];

// app
const app = new App();
app
  .viewsCached($viewsCached)
  .auth($auth)
  .httpClient($httpClient)
  .debug($debugOpts);

app
  .routes($routes)
  .listen();


