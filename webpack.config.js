var path = require('path')
var webpack = require('webpack')
var tran = process.hrtime()[1];
module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'Stars.vue'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: `[name].lazy.[hash].${tran}.js`,
    publicPath: './js/',
  },
  plugins: process.env.NODE_ENV !== 'production' ? [
     new webpack.optimize.UglifyJsPlugin({minimize: true})
  ] : [
  ] ,
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        exclude: /(node_modules)/,
        loader: 'url-loader',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        exclude: /(node_modules)/,
        loader: 'url-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        exclude: /(node_modules)/,
        options: {
                name: '[name].[ext]?[hash]'
        }
      },
      {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
          exclude: /(node_modules)/
      },
      {
        test: /\.scss$/, 
        loader: ["style", "css?sourceMap", "sass?sourceMap"],
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
