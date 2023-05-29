import { HTTPServer } from '@mikosoft/spa-server';


///// development HTTP Server
/*
const httpOpts = {
  staticDir: 'src',
  indexFile: 'index.html',
  openDirs: 'node_modules/@mikosoft/dodo',
  port: process.env.PORT || 3001,
  timeout: 5 * 60 * 1000, // if 0 never timeout
  acceptEncoding: 'gzip', // gzip, deflate or ''
  headers: {
    // CORS Headers
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET', // 'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD',
    'Access-Control-Max-Age': '3600'
  },
  debug: false
};
const httpServer = new HTTPServer(httpOpts);
httpServer.start();
*/


const httpOpts = {
  staticDir: 'dist',
  indexFile: 'index.html',
  openDirs: 'src/views',
  port: process.env.PORT || 3000,
  timeout: 5 * 60 * 1000, // if 0 never timeout
  acceptEncoding: 'gzip', // gzip, deflate or ''
  headers: {
    // CORS Headers
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET', // 'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD',
    'Access-Control-Max-Age': '3600'
  },
  debug: true
};
const httpServer = new HTTPServer(httpOpts);
httpServer.start();
