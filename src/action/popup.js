import 'bootstrap'; // import bootstrap.js
import { AppOne } from '@mikosoft/dodo';

// conf
import { $httpClient, $debugOpts } from './conf/index.js';

// controller
import PopupCtrl from './controllers/PopupCtrl.js';

// app
const appOne = new AppOne('ChromeExtensionActionPopup');
appOne
  .httpClient($httpClient)
  .debug($debugOpts)
  .controller(PopupCtrl);
