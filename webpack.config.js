const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
        },
      },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     // Creates `style` nodes from JS strings
      //     "style-loader",
      //     // Translates CSS into CommonJS
      //     "css-loader",
      //     // Compiles Sass to CSS
      //     "sass-loader",
      //   ],
      // },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: path.join(__dirname, 'src', 'index.html'),
      // template: 'index.html'
    }),
  ],
  devServer: {
    static: {
      publicPath: '/dist',
      directory: path.resolve(__dirname, 'dist')
    },
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
};