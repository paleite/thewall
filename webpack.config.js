const webpack = require('webpack')
const providePlugin = new webpack.ProvidePlugin({
  $: 'jquery'
})
const contextReplacementPlugin = new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-us/)

module.exports = {
  context: __dirname,
  entry: './src/main.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js'
  },
  plugins: [
    providePlugin,
    contextReplacementPlugin
  ],

  module: {
    rules: [
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: "file-loader?name=[name].[ext]"
      },
      {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader' // creates style nodes from JS strings
      }, {
        loader: 'css-loader' // translates CSS into CommonJS
      }, {
        loader: 'postcss-loader' // autoprefix
      }, {
        loader: 'sass-loader' // compiles Sass to CSS
      }]
    }]
  }
}
