const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './app.js',
  output: {
    filename: 'app.bundle.min.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {
      "fs": false,
      "path": false,
      "crypto": false
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEV__': false
    })
  ]
};