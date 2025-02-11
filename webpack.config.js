const path = require('path');

module.exports = {
  entry: './flowfields/flowfields.ts',
  output: {
    filename: 'flowfields.js', // Use a single filename for the entry point
    path: path.resolve(__dirname, 'dist'),
    library: 'FlowFields',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  mode: 'development', // Use 'development' mode for faster builds
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  optimization: {
    minimize: true,
    splitChunks: false // Disable code splitting
  },
  externals: {
    'pixi.js': 'PIXI'
  },
  devServer: {
    static: {
      directory: path.join(__dirname),
      watch: true,
    },
    compress: true,
    port: 8080,
    hot: true,
    open: true
  }
};