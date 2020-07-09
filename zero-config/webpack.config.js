const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {                                      // 1. 多个chunk打包
        main: './src/js/main.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'), // 打包后的输出路径, 使用Node中的Path模块, 执行为绝对路径
        filename: 'js/[name]-[chunkhash].js', // 1. 多个chunk打包打包后的文件名称使用name和chunkhash占位符, name表示entry中的键值, chunkhash表示打包的hash
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, './node_modules'), // 忽略打包node_modules中的js文件
                include: path.resolve(__dirname, './src'), // 只打包src目录下的js文件
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                exclude: path.resolve(__dirname, './node_modules'),
                include: path.resolve(__dirname, './src'),
                loader: 'style-loader!css-loader', // 串联两个loader, style-loader会将css-loader编译的css插入到html文件的style标签中
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(), // 在打包很慢的时候, 展示打包的进度条
        new cleanWebpackPlugin.CleanWebpackPlugin(), // 使用cleanWebpackPlugin, 每次打包生成文件之前将上次构建的文件全部删除
        new htmlWebpackPlugin({
            filename: 'young.html',
            template: 'index.html',
            title: 'webpack is something awesome!!'
        }),
    ],
};
