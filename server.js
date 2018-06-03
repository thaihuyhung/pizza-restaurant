/* eslint-disable */
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const webpack = require('webpack');
const webpackConfigDev = require('./webpack.dev');
const webpackConfigProd = require('./webpack.prod');
const opn = require('opn');

const port = process.env.PORT || 4000;
const __DEV__ = process.env.NODE_ENV === 'development';

app.use(express.static(__dirname))

if (__DEV__) {
  const compiler = webpack(webpackConfigDev)

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    contentBase: path.resolve(__dirname, '/src'),
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: 'normal',
    open: true,
    openPage: 'localhost:' + port
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }));

  app.use(express.static(path.resolve(__dirname, 'public')))

  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    });
  });
} else {
  // TODO SSR
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  opn('http://localhost:' + port);
});

