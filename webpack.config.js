const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  const envPath = path.resolve(__dirname, '.env')
  const envVars = require('dotenv').config({ path: envPath }).parsed || {}

  return {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                outputPath: 'images',
              },
            },
          ],
        },
      ],
    },
    devServer: {
      hot: true, 
      port: 3000,
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        filename: 'index.html',
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envVars),
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
      }),
    ],
  }
}
