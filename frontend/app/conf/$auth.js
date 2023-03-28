import { corelib } from '@mikosoft/dodo';

const authOpts = {
  apiLogin: 'http://localhost:8001/panel/users/login',
  afterGoodLogin: '/playground/{loggedUserRole}/dashboard', // redirect after succesful login:
  afterBadLogin: '/playground/login',  // redirect after unsuccesful login
  afterLogout: '/playground/login'     // URL after logout
};
const $auth = new corelib.Auth(authOpts);

export { $auth };


