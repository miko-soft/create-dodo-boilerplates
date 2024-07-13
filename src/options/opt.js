import { AppOne } from '@mikosoft/dodo';

// conf
import { $httpClient, $debugOpts } from './conf/index.js';

// controller
import OptionsCtrl from './controllers/OptionsCtrl.js';

// app
const appOne = new AppOne('myChromeExtension');
appOne
  // .httpClient($httpClient)
  .debug($debugOpts)
  .controller(OptionsCtrl);
