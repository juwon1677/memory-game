const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // new line

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map',  // new line
  devServer: {                 // new line
    static: './dist'      // new line
  },
  plugins: [
    new CleanWebpackPlugin(), // new line
    new ESLintPlugin({
      context: "compiler.context",
      eslintPath: "eslint",
      extensions: 'js',
      exclude: 'node_modules',
      fix: false,
      formatter: 'stylish',
      lintDirtyModulesOnly: false,
      threads: false,
      emitError: true,
      emitWarning: true,
      failOnError: true,
      failOnWarning: false,
      quiet: false,
      outputReport: false
    }),

    new HtmlWebpackPlugin({
      title: 'Shape Tracker',
      template: './src/index.html',
      inject: 'body'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },

    ]
  }
};
