import { HTTPServer } from '@mikosoft/spa-server';


const httpOpts = {
  staticDir: 'dist',
  indexFile: 'index.html',
  urlRewrite: {}, // map URLs to directory: {url1: dir1, url2:dir2} NOTICE:The url i.e. the object key can contain regex chars like ^ $ * ...
  port: process.env.PORT || 3000,
  timeout: 5 * 60 * 1000, // if 0 never timeout
  acceptEncoding: 'gzip', // gzip, deflate or ''
  headers: {
    // CORS Response Headers
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'OPTIONS, GET', // 'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, PATCH, DELETE, HEAD',
    'Access-Control-Max-Age': '3600'
  },
  ssr: 'all', // none, all, botsonly
  ssrConsole: false, // frontend JS logs in the backend
  ssrModifier: (document) => { // modify document on the server side
    document.title = 'Modified title';
    const script = document.createElement('script');
    script.textContent = "console.log('Dynamic script executed!')";
    document.body.appendChild(script);
  },
  debug: false,
  debugHTML: true
};
const httpServer = new HTTPServer(httpOpts);
httpServer.start();
