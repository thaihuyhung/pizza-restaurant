require('ignore-styles');

require('babel-register')({
    ignore: [ /(node_modules)/ ],
    presets: ["es2015", "stage-0", "react"],
    plugins: [
      'react-loadable/babel'
    ]
});

require('babel-core').transform('code', {
  plugins: ['dynamic-import-node']
});

require('regenerator-runtime/runtime');


require('./index');