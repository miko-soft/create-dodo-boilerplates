import { App } from '@mikosoft/dodo';

// conf
import { $debugOpts, $viewsCached, $auth, $httpClient, $routes } from './app/conf/index.js';

// controllers
import HomeCtrl from './app/controllers/HomeCtrl.js';
import Page1Ctrl from './app/controllers/Page1Ctrl.js';
import NotfoundCtrl from './app/controllers/NotfoundCtrl.js';

// app
const app = new App($debugOpts);
app
  .controllers([
    HomeCtrl,
    Page1Ctrl,
    NotfoundCtrl
  ])
  .httpClient($httpClient)
  .auth($auth) // needed for route authGuards
  .viewsCached($viewsCached);

app.routes($routes).listen();


