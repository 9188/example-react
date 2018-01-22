

export default function(context, opts = {}) {
  return {
    presets: [[require.resolve('babel-preset-umi'), opts]],
  };
}


module.exports = {
    entry: { 
      index: [ './src/index.js' ] 
    },
    output: {
      path: '/Users/wangwei/Desktop/test/dist',
      pathinfo: true,//dev true  dist false
      filename: '[name].js',
      publicPath: undefined,
      chunkFilename: '[name].async.js' 
    },
    module: {
      rules: [
          {
            test: /\.tsx?$/,
            include: opts.cwd,
            exclude: /node_modules/,
            enforce: 'pre',
            use: [
              {
                options: {
                  emitErrors: true,
                  // formatter: eslintFormatter,
                },
                loader: require.resolve('tslint-loader'),
              },
            ],
          },
          {
            test: /\.(js|jsx)$/,
            include: opts.cwd,
            exclude: /node_modules/,
            enforce: 'pre',
            use: [
              {
                options: eslintOptions,
                loader: require.resolve('eslint-loader'),
              },
            ],
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
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [ { loader: '/Users/wangwei/my-project/cli模板/roadhog 2.1/node_modules/_af-webpack@0.14.0@af-webpack/lib/debugLoader.js' },
            { loader: '/Users/wangwei/my-project/cli模板/roadhog 2.1/node_modules/_babel-loader@8.0.0-beta.0@babel-loader/lib/index.js',
              options:
               { presets: [Array],
                 plugins: [],
                 cacheDirectory: false,
                 babelrc: false } } ],
          },
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [
              { loader: '/Users/wangwei/my-project/cli模板/roadhog 2.1/node_modules/_af-webpack@0.14.0@af-webpack/lib/debugLoader.js' },
              { loader: '/Users/wangwei/my-project/cli模板/roadhog 2.1/node_modules/_babel-loader@8.0.0-beta.0@babel-loader/lib/index.js',
              options:
               { presets: [Array],
                 plugins: [],
                 cacheDirectory: false,
                 babelrc: false } },
              {
                loader: require.resolve('awesome-typescript-loader'),
                options: {
                  transpileOnly: true,
                },
              },
            ],
          },
          {
            test: /\.html$/,
            loader: require.resolve('file-loader'),
            options: {
              name: '[name].[ext]',
            },
          },
          ...cssRules
        ] 
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ExtractTextPlugin({
        filename: `[name]${cssHash}.css`,
        allChunks: true,
      }),
      new ManifestPlugin({
        fileName: 'manifest.json',
        ...opts.manifest,
      }),
      new webpack.optimize.UglifyJsPlugin({
        ...uglifyJSConfig,
        ...(opts.devtool ? { sourceMap: true } : {}),
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          // eslint-disable-line
          isDev ? 'development' : 'production',
        ), // eslint-disable-line
        // 给 socket server 用
        ...(process.env.SOCKET_SERVER
          ? {
              'process.env.SOCKET_SERVER': JSON.stringify(
                process.env.SOCKET_SERVER,
              ),
            }
          : {}),
        ...stringifyObject(opts.define || {}),
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: process.env.ANALYZE_PORT || 8888,
        openAnalyzer: true,
      }),
      new HTMLWebpackPlugin(opts.html),
      new CaseSensitivePathsPlugin(),
      new webpack.LoaderOptionsPlugin({
        options: {
          context: __dirname,
        },
      }),
      new ForkTsCheckerWebpackPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.optimize.CommonsChunkPlugin(common),
      new CopyWebpackPlugin([
        {
          from: resolve(opts.cwd, 'public'),
          to: outputPath,
          toType: 'dir',
        },
      ])
    ],
    resolve:{
      modules:[
        '/Users/wangwei/my-project/cli模板/roadhog 2.1/node_modules/_af-webpack@0.14.0@af-webpack/node_modules',
        'node_modules' 
      ],
      extensions:[
        '.web.js',
        '.web.jsx',
        '.web.ts',
        '.web.tsx',
        '.js',
        '.json',
        '.jsx',
        '.ts',
        '.tsx' 
      ],
      alias: {
        '@babel/runtime': '/Users/wangwei/my-project/cli模板/roadhog 2.1/node_modules/_@babel_runtime@7.0.0-beta.31@@babel/runtime' 
      } 
    },
    bail: false,
    devtool: undefined,
    node:{
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    },
    performance: { hints: false }
};
