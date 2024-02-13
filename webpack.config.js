const path = require('path');

module.exports = {
  entry: './flowfields/index.js',
  output: {
    filename: 'flowfields.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'FlowFields'
  },
  mode: 'development', // or 'production'
};