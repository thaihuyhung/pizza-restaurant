const path = require('path')
const fs = require('fs')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['babel-polyfill', './src/index.jsx'],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "eslint-loader",
        ]
      }, {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 4,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              },
              svgo: {
                cleanupAttrs: true
              }
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader"
        },
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      filename: path.join(process.cwd(), 'dist/index.html'),
      templateContent: templateContent(),
      inject: true
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/"
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      assets: path.resolve(__dirname, 'assets'),
      src: path.resolve(__dirname, 'src')
    }
  }
}

function templateContent() {
  return fs
    .readFileSync(
      path.resolve(process.cwd(), 'public/index.html')
    )
    .toString();
}