const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const alias = {
  'showError': path.resolve('./src/services/showError'),
  'components': path.resolve('./src/components'),
  'services': path.resolve('./src/services'),
  'store': path.resolve('./src/store')
}
module.exports = env => {
  const production = env === 'production'
  let outputCSS = 'bundle.css'
  let outputJS = 'bundle.js'
  return ({
    entry: ['babel-polyfill', './src/app'],
    output: {
      path: path.resolve(__dirname, './'),
      filename: outputJS
    },
    devtool: production ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx?)$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['env', {'modules': false}], 'stage-0', 'react']
              }
            }
          ]
        },
        {
          test: /\.styl$/,
          use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'stylus-loader']
          }))
        },
        {
          test: /\.css/,
          use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          }))
        },
        {
          test: /\.(img|png|svg)$/,
          use: 'url-loader'
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      stats: {
        version: false,
        modules: false,
        assets: false,
        hash: false
      },
      port: '3000'
    },
    plugins: [
      new ExtractTextPlugin(outputCSS),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env)
        }
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: alias
    }
  })
}
