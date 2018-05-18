
const path = require('path')
const webpack = require('webpack')
const Merge = require('webpack-merge');
const CommonConfig = require('./common.js');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
// const DashboardPlugin = require('webpack-dashboard/plugin')

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist/'),
    pathinfo: true,
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('dev')
      }
    }),
    new CaseSensitivePathsPlugin(),//它将输出每个目录的读取，以及文件系统操作的总和。这种内部插件的调试
    new webpack.HotModuleReplacementPlugin(),
    new WatchMissingNodeModulesPlugin(path.resolve(__dirname, '../node_modules')),
    new webpack.SourceMapDevToolPlugin({
      columns: false,
      moduleFilenameTemplate: info => {
        if (
          /\/koi-pkgs\/packages/.test(
            info.absoluteResourcePath,
          ) ||
          /packages\/koi-core/.test(info.absoluteResourcePath) ||
          /webpack\/bootstrap/.test(info.absoluteResourcePath) ||
          /\/node_modules\//.test(info.absoluteResourcePath)
        ) {
          return `internal:///${info.absoluteResourcePath}`;
        }
        return resolve(info.absoluteResourcePath).replace(
          /\\/g,
          '/',
        );
      },
    }),
    // new DashboardPlugin(),
  ],
  devServer: {
    // contentBase: "./public",//本地服务器所加载的页面所在的目录 默认不填就是当前目录
    historyApiFallback: true,//不跳转 
    inline: true, //切换 iframe inline 刷新机制
    host: "localhost",
    port: 8083,
    open:true,
    noInfo: true, //除了error 其他的提示都不用
    hot:true,//使用热加载插件 HotModuleReplacementPlugin
    compress:true, //开启gzip压缩
    stats: "errors-only", //仅显示报错 我们不设置的时候 终端会显示很多文件编译的提示  还有"minimal"，"normal"，"verbose”三种值
    historyApiFallback:{//如果文件没有 就显示to指定的页面
       rewrites:[
          {from:/./,to:'/404.html'}
       ]
    }, 
    overlay: true,// true报错在浏览器屏幕上显示  默认是false
    quiet: false//默认false 如果设置成true  同样的内容第二次编译不会再terminal 打印提示
  },
}

module.exports = Merge(CommonConfig, config)