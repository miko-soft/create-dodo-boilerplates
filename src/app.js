import { AppOne } from '@mikosoft/dodo';

// conf
import { $auth, $httpClient, $debugOpts } from './conf/index.js';

// controller
import HomeCtrl from './controllers/HomeCtrl.js';


// app
const appOne = new AppOne('myDodoAppOne');
console.log(appOne);
appOne
  .auth($auth)
  .httpClient($httpClient)
  .debug($debugOpts)
  .controller(HomeCtrl);


