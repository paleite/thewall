module.exports = {
  context: __dirname,
  entry: "./src/main.js",
  output: {
    path: __dirname + "/dist",
    filename: "main.js"
  },

  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    }]
  }
};
