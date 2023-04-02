import { corelib } from '@mikosoft/dodo';

const authOpts = {
  apiLogin: 'http://localhost:8001/panel/login',
  afterGoodLogin: '/panel/{loggedUserRole}/dashboard', // redirect after succesful login:
  afterBadLogin: '/panel/login',  // redirect after unsuccesful login
  afterLogout: '/panel/login'     // URL after logout
};
const $auth = new corelib.Auth(authOpts);

export { $auth };


