const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: 'production',
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.mp3$/,
        use: {
              loader: 'file-loader',
              options: {
              name: '[path][name].[ext]'
              } 
         }      
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};