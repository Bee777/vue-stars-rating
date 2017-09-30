var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var tran = process.hrtime()[1];
var config = {
  entry: {
    stars: path.resolve(__dirname, 'src', 'Stars.vue'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: `[name].lazy.[hash].${tran}.js`,
    publicPath: './dist/',
  },
  plugins: [
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
  ],
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
  externals: {
    vue: 'vue'
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
}//end config
var mergeWithConfigWindowTarget = merge(config, {
    devtool: '#source-map',
    plugins: [
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
    ],
    output: {
      filename: '[name].min.js',
      libraryTarget: 'window',
      library: 'VueStarsRatingWindow'
    }
});
var mergeWithConfigUMDTarget = merge(config, {
    devtool: '#source-map',
    plugins: [
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
    ],
    output: {
      filename: '[name].umd.js',
      libraryTarget: 'umd',
      // These options are useful if the user wants to load the module with AMD
      library: 'vue-stars-rating-umd',
      umdNamedDefine: true
    }
});
var mergeWithConfigCommonJs2Target = merge(config, {
    devtool: '#source-map',
    plugins: [
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
    ],
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        library: 'vue-stars-rating'
    }
});
module.exports = [mergeWithConfigCommonJs2Target,mergeWithConfigUMDTarget, mergeWithConfigWindowTarget]
