var path = require("path");
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {                                      // 1. 多个chunk打包
        main: './src/js/main.js',
        a: './src/js/a.js',
    },
    output: {
        path: path.resolve(__dirname, './dist/js'), // 打包后的输出路径, 使用Node中的Path模块, 执行为绝对路径
        filename: '[name]-[chunkhash].js', // 1. 多个chunk打包打包后的文件名称使用name和chunkhash占位符, name表示entry中的键值, chunkhash表示打包的hash
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html'
        })
    ],
};
