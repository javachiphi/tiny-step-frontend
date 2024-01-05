const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = (env) => {
  // const isProduction = env.NODE_ENV === 'production'
  // const envFile = isProduction ? '.env.production' : '.env.development'
  const envPath = path.resolve(__dirname, '.env')
  const envVars = require('dotenv').config({ path: envPath }).parsed || {}

  return {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
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
                publicPath: 'images',
              },
            },
          ],
        },
      ],
    },
    devServer: {
      static: path.resolve(__dirname, './dist'),
      port: 3000,
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envVars),
      }),
    ],
  }
}
