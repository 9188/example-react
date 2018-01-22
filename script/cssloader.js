const autoprefixer = require('autoprefixer')

const postcss_plugin = () => [
  require('postcss-flexbugs-fixes'),
  autoprefixer({
    browsers: [ 'last 2 versions' ],
    flexbox: 'no-2009',
  })
]

module.exports = [
  {
    test: /\.css$/,
    use: [
      'style-loader',
      { 
        loader: 'css-loader',
      },
      { 
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: postcss_plugin
        }
      } 
    ]
  },
  {
    test: /\.less$/,
    use: [ 
      'style-loader',
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
      'less-loader'
    ]
  },
  {
    test: /\.(sass|scss)$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
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
  }
];