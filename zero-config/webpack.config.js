var path = require("path")

module.exports = {
    entry: './src/js/main.js', // 打包的入口文件
    output: {
        path: path.resolve(__dirname, './dist/js'), // 打包后的输出路径, 使用Node中的Path模块, 执行为绝对路径
        filename: 'bundle.js' // 打包后的文件名称
    },
};
