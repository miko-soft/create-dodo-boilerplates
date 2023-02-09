import { HTTPServer } from '@mikosoft/spa-server';

class HTTPServerWebpackPlugin extends HTTPServer {
  constructor(httpOpts = {}) {
    super(httpOpts);
  }
  apply(compiler) {
    this.start();
  }
}

export default HTTPServerWebpackPlugin;
