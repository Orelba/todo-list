const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    // clean: true,
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     title: 'Todo List',
  //   }),
  // ],
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/i,
  //       use: ['style-loader', 'css-loader'],
  //     },
  //     {
  //       test: /\.(png|svg|jpg|jpeg|gif)$/i,
  //       type: 'asset/resource',
  //     },
  //   ],
  // },
  // optimization: {
  //   runtimeChunk: 'single',
  // }
};