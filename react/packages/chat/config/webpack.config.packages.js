var path = require('path');
var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
const autoprefixer = require('autoprefixer');

var isEnvProduction = true;


var createWebpackConfig = {

  entry: './src/lib/index.js',
  output: {
    path: path.resolve(__dirname, '..' , 'dist'),
    filename: 'index.js'
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
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          },

          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
            exclude: [
              // path.resolve(__dirname, "../../../node_modules/bootstrap"),
            ]
          },
          {
            test: /\.module\.css$/,
            // exclude: /\.module\.css$/,
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]__[local]__[hash:base64:5]'
                }
              },
              // {
              //   loader: 'postcss-loader',
              //   options: {
              //     ident: "postcss",
              //     sourceMap: true
              //   },
              // }
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
