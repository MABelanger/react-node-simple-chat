var path = require('path');
var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');

var createWebpackConfig = {
    node: {
      fs: 'empty', // Because of jsrsasign usage of fs
      buffer: 'empty'
    },
    entry: './src/lib/index.js',
    output: {
        filename:'index.js',
        libraryTarget:'umd',
        path: path.join(__dirname, '../', 'dist')
    },
    plugins:[
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
    module: {
      rules: [
        {
          test: /.js$/,
          loaders: 'babel-loader',
          query: {
            presets: ['react-app']
          },
          exclude: /node_modules/,
          include: path.join(__dirname, '../')
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        }
      ]
    },
    // this is for the sourcemaps
    devtool:'inline-source-map',
    externals: [nodeExternals()]
};


module.exports = createWebpackConfig;
