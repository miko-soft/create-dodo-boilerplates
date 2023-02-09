/**
 * Run "npx webpack --config webpack.config.js" from the project's root folder.
 */
import path from 'path';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import HTTPServerWebpackPlugin from './backend/HTTPServerWebpackPlugin.js';


export default {
  mode: 'production',
  stats: { warnings: true },

  entry: {
    'app': './frontend/app.js',
    'app.min': './frontend/app.js',
    'styles': './frontend/styles.scss',
    // 'viewsCached': './frontend/views.js'
  },
  output: {
    path: path.resolve(process.cwd(), 'frontend/_dist'),
    filename: '[name].js',
    clean: true // remove content of the directory defined in the output.path
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules|backend/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: '', name: '[name].css' } // [name] is the name of styles.scss
          },
          {
            loader: 'sass-loader',
            options: { implementation: 'node-sass', sourceMap: true }
          }
        ]
      }, {
        test: /\.js$/,
        loader: 'esbuild-loader',
        exclude: /node_modules|backend/,
        options: {
          target: 'es2015'
        }
      }, {
        test: /\.html$/i,
        exclude: /node_modules|backend/,
        use: 'html-loader',
      }
    ]
  },

  // generate *.map.js
  devtool: 'source-map',


  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        include: /\.min\.js$/, // minify only app.min.js
        keepNames: true, // keep function names https://esbuild.github.io/api/#keep-names
      }),
    ],
  },


  // watcher
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
    ignored: ['node_modules', 'backend']
  },


  plugins: [
    new HTTPServerWebpackPlugin({ staticDir: 'frontend', indexFile: 'index.html', port: 8100, timeout: 300000, acceptEncoding: 'gzip', debug: false })
  ]

};
