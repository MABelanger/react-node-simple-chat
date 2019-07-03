var path = require('path');
var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');

var isEnvProduction = true;

var createWebpackConfig = {

  entry: './src/lib/index.js',
  output: {
    path: path.resolve(__dirname, '..' , 'dist'),
    filename: 'index.js',
    libraryTarget:'umd'
  },

  target: 'node', // in order to ignore built-in modules like path, fs, etc.

  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../../node_modules')
  })],

  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
              test: /\.(jpg|png|svg)$/,
              loader: 'url-loader',
              options: {
                limit: 25000,
              },
          },
          {
              test: /\.(jpg|png|svg)$/,
              loader: 'file-loader',
              options: {
                name: '[path][name].[hash].[ext]',
              },
          },
          {
            test: /\.module\.css$/,
            use: [
              {
                loader: "style-loader"
              },
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  localIdentName: "[name]_[local]_[hash:base64]",
                  camelCase: true,
                  sourceMap: true
                }
              }
            ]
          },
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: ["react-app"],
              cacheDirectory: true,
              cacheCompression: isEnvProduction,

              // If an error happens in a package, it's possible to be
              // because it was compiled. Thus, we don't want the browser
              // debugger to show the original code. Instead, the code
              // being evaluated would be much more helpful.
              sourceMaps: false,
            },
          },
        ]
      }
    ]
  },
};


module.exports = createWebpackConfig;
