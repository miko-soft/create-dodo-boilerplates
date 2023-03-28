/**
 * Import HTML files to process with the Webpack and bundle with app.js.
 * The final result is HTML (views) inserted in the _bundle/app.js
 */
import incNavbar from '../../views/inc/navbar.html';
import page1Main from '../../views/pages/page1/main.html';

const $viewsCached = {
  'inc/navbar.html': incNavbar,
  'pages/page1/main.html': page1Main
};

export { $viewsCached };

