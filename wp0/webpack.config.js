const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/main2.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),    // 打包后的输出路径, 使用Node中的Path模块, 执行为绝对路径
        filename: 'js/[name]-[hash].js',
    },
    // 以下是各种loader
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, './node_modules'), // 忽略打包node_modules中的js文件
                include: path.resolve(__dirname, './src'),          // 只打包src目录下的js文件
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',                        // 预设: 指示babse做怎么样的兼容处理.
                            {
                                useBuiltIns: 'usage',                   // 表示按需加载polyfill
                                corejs: {                               // 安装使用core-js.
                                    version: 3
                                },
                                targets: {                               //  指定js兼容性做到哪个版本的浏览器.
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    edge: '17'
                                }
                            }
                        ]
                    ],
                    cacheDirectory: true,                           // 开启babel缓存, 第二次构建时, 会读取之前的缓存, 从而打包速度会更快些.
                }
            },
            {
                test: /\.css$/,
                exclude: path.resolve(__dirname, './node_modules'),
                include: path.resolve(__dirname, './src'),
                // MiniCssExtractPlugin.loader将css文件提取到单独的css文件中, 而不是放在html的<style>标签中.
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../' // build出来后图片地址不显示, 应该需要配置下publicPath.
                        },
                    }, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                exclude: path.resolve(__dirname, './node_modules'),
                include: path.resolve(__dirname, './src'),
                loader: 'url-loader',
                // 设置文件最大值, 当要打包的文件小于指定最大值时, 会将文件打包成base64, 当大于指定值时会通过file-loader插件对图片文件进行打包, 因此也需要安装下file-loader.
                query: {
                    limit: 1024,
                    name: 'assets/img/[name]-[hash:5].[ext]'
                }
            },
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),                   // 在打包很慢的时候, 展示打包的进度条. 
        new cleanWebpackPlugin.CleanWebpackPlugin(),    // 使用cleanWebpackPlugin, 每次打包生成文件之前将上次构建的文件全部删除.
        new htmlWebpackPlugin({
            filename: 'webpack5.html',
            template: 'index.html',
            title: 'webpack is something awesome!!'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/styles/[name]-[hash:5].css' // 对输出的css文件进行重命名.  
        }),
        new OptimizeCssWebpackPlugin(),                   // 压缩css.
    ],

    // 配置热更新的开发服务器: 自动编译, 自动打开和刷新浏览器.
    // 开发服务器模式下, 只会在内存中打包, 而不会有文件输出到dist目录, 类似于angular-cli的 ng serve.
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,                                 // 开启gzip压缩.
        port: 3000,                                     // 指定本地启动的开发服务器的端口号.(启动后访问的地址是: localhost:3000/webpack5.html).
        open: true,                                     // 自动打开浏览器.
        hot: true,                                      // 表示开启HMR功能. 只对css文件的改动进行HMR(css文件天热支持HMR)      
    },
    devtool: 'source-map',                              // 开启source-map的功能.
};
