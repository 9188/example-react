const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin =require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
// const css = require('./cssloader')

const extractCSS = new ExtractTextPlugin('css/[name].[chunkhash:7].css');
const extractLESS = new ExtractTextPlugin('css/[name].[chunkhash:7]-less.css');
const extractSASS = new ExtractTextPlugin('css/[name].[chunkhash:7]-scss.css');

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
        test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader',enforce: 'pre',
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
          limit: 10000,
          name: 'static/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: "style-loader",
          use:[
            { 
              loader: 'css-loader',
              // options: {
              //   importLoaders: 1,
              //   modules: true,
              //   localIdentName: '[local]___[hash:base64:5]'
              // }
            },
            { 
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: postcss_plugin
              }
            }
          ]
        }),
      },
      {
        test: /\.less$/,
        use: extractLESS.extract({
          fallback: "style-loader",
          use: "css-loader!less-loader",
          use: [
            {
              loader: 'css-loader',
              // options: {
              //   importLoaders: 2,
              //   modules: true,
              //   localIdentName: '[local]___[hash:base64:5]' 
              // }
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
        use: extractSASS.extract({
          fallback: "style-loader",
          use:[
            {
              loader: 'css-loader',
              options: { 
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
        }),
      }

    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      inject: true
    }),
    extractCSS,
    extractLESS,
    extractSASS,
    
  ],
  resolve:{
    extensions: ['.web.js', '.web.jsx', '.jsx', '.js', '.json', '.less', '.scss'],
  },

}

module.exports = config;