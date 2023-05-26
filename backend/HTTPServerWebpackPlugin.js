import { HTTPServer } from '@mikosoft/spa-server';

class HTTPServerWebpackPlugin extends HTTPServer {
  constructor(httpOpts = {}) {
    super(httpOpts);
  }

  async apply(compiler) {
    await new Promise(r => setTimeout(r, 8000));
    this.start();
  }

}

export default HTTPServerWebpackPlugin;
