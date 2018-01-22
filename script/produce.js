
const path = require('path')
const webpack = require('webpack')
const Merge = require('webpack-merge');
const CommonConfig = require('./common.js');
const CompressionPlugin = require("compression-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const os = require('os');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  // devtool: 'cheap-module-source-map'
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
    vendor: [
        'react', 
        'react-dom',
        'react-router-dom',
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].[chunkhash:7].js",
    chunkFilename: '[name].async.js',
    publicPath: './',
    pathinfo: false
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      compress: {warnings: false},
      output: {comments: false},
    }),
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     ie8: false,
    //     ecma: 8,
    //     mangle: true,
    //     output: { comments: false },
    //     compress: { warnings: false }
    //   },
    //   sourceMap: false,
    //   cache: true,
    //   parallel: os.cpus().length * 2
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash:7].js',
    }),
    // new CompressionPlugin({
    //   asset: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: /\.js$|\.css$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0
    // }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),//解释是启用作用域提升，使代码变小
    new ManifestPlugin({
      fileName: 'manifest.json',
    }),
    new BundleAnalyzerPlugin({//WebPACK束分析仪
      analyzerMode: 'static',
      // analyzerPort: 8888,
      // openAnalyzer: true,
    }),
    
    new webpack.LoaderOptionsPlugin({//兼容webpack 1 loader模式
      options: {
        context: __dirname,
      },
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),//忽略模块 不打包
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(process.cwd(), 'public'),
    //     to: '',
    //     toType: 'dir',
    //   },
    // ])
  ],
  node:{
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  // performance: { hints: false }
}

module.exports = Merge(CommonConfig, config)