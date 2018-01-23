const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin =require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const postcss_plugin = () => [
  require('postcss-flexbugs-fixes'),
  autoprefixer({
    browsers: [ 'last 2 versions' ],
    flexbox: 'no-2009',
  })
]

const config = {
  module: {
    noParse: function(content){
      return /jquery/.test(content);
    },
    rules: [
      {
        test: /\.html$/,
        loader: 'file-loader',
        exclude:[/node_modules/, path.join(process.cwd(), './index.html')],
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader?cacheDirectory',enforce: 'pre',
      },
      {
        exclude: [
          /\.html|ejs$/,
          /\.json$/,
          /\.(js|jsx|ts|tsx)$/,
          /\.(css|less|scss|sass)$/,
        ],
        loader: require.resolve('url-loader'),
        options: {
          limit: 5000,
          name: 'static/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            { 
              loader: 'css-loader',
              options: {
                minimize: true,
                // importLoaders: 1,
                // modules: true,
                // localIdentName: '[local]___[hash:base64:5]'
              }
            },
            { 
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: postcss_plugin
              }
            }
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                // importLoaders: 2,
                // modules: true,
                // localIdentName: '[local]___[hash:base64:5]' 
              }
            },
            { 
              loader: 'postcss-loader',
              options: { ident: 'postcss', plugins: postcss_plugin }
            },
            'less-loader'
          ]
        })
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                importLoaders: 2,
                modules: true,
                localIdentName: '[local]___[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: { ident: 'postcss', plugins: postcss_plugin } 
            },
            'sass-loader'
          ]
        })
      }

    ]
  },
  plugins: [
    new webpack.BannerPlugin('彩亿科技'),
    
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      inject: true
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname,'../dll/caiyi_react.js'),
      includeSourcemap: false,
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll/caiyi-react-manifest.json'),
    }),
    new ExtractTextPlugin({
      filename: `[name].[contenthash:7].css`,
      allChunks: true,
    }),
    
    // new webpack.ProvidePlugin({
    //   Promise: "exports-loader?global.Promise!es6-promise",
    //   fetch: "exports-loader?self.fetch!whatwg-fetch"
    // }),
  ],
  resolve:{
    extensions: ['.web.js', '.web.jsx', '.jsx', '.js', '.json', '.less', '.scss'],
    modules: [path.resolve(__dirname, '../node_modules')],
    // alias: {
    //   'moment': 'moment/min/moment.min.js',
    //   'react': 'react/dist/react.js',
    //   'react-dom': 'react-dom/dist/react-dom.js'
    // }
  },

}

module.exports = config;