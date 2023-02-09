import { App, corelib } from '@mikosoft/dodo';
import views from './views.js';
import env from './app/envs/development.env.js';
console.log('env::', env);
// console.log('views::', views);


// conf
import { $debugOpts, authOpts } from './app/conf/index.js';



// controllers
import HomeCtrl from './app/controllers/HomeCtrl.js';
import Page1Ctrl from './app/controllers/Page1Ctrl.js';
import NotfoundCtrl from './app/controllers/NotfoundCtrl.js';


// routes
const routes = [
  ['when', '/', 'HomeCtrl'],
  ['when', '/page1', 'Page1Ctrl'],
  ['notfound', 'NotfoundCtrl']
];

// auth
const auth = new corelib.Auth(authOpts);

// app
const app = new App();


app
  .controllers([
    HomeCtrl,
    Page1Ctrl,
    NotfoundCtrl
  ]);

app
  .auth(auth) // needed for route authGuards
  .debugger($debugOpts);

app
  .routes(routes)
  .viewsCached(views);


