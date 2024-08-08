import { AppOne } from '@mikosoft/dodo';

// conf
import { $httpClient, $debugOpts } from './conf/index.js';

// controller
import HomeCtrl from './controllers/HomeCtrl.js';


// app
const appOne = new AppOne('myDodoAppOne');
appOne
  .httpClient($httpClient)
  .debug($debugOpts)
  // .i18n()
  .controller(HomeCtrl);


