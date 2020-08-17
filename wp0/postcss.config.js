// https://newsn.net/say/webpack-postcss.html
module.exports = {
    plugins: [
        require('autoprefixer') // autoprefixer可以将正在实验中的css属性加上各个浏览器前缀, 如现在index.html中的::placeholder属性
    ]
};