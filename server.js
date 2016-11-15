'use strict'

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
config.entry.unshift('webpack-dev-server/client?http://localhost:8091', "webpack/hot/dev-server");
config.plugins.push(new webpack.HotModuleReplacementPlugin());

var proxy = [{
    path: "/nasa/*",
    // target: "http://173.37.217.143:8080",
    // target: "http://www.qiurenqi.com:8080",
    target: "http://114.215.192.102:8080",
    // host: "114.55.144.200:8080"
}]
//启动服务
var app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: {
      index: 'buyer.html'
    },
    proxy: proxy
});
app.listen(8091);
