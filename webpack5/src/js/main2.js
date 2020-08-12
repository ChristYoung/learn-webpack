// 需要在入口顶部通过 import 将 polyfill 引入，以确保它能够最先加载.
// 【2020-08-12已经使用core-js修改为按需加载polyfill的方式, 在webpack-config.js中体现】
// import 'babel-polyfill';

import '../styles/a.css';
import '../styles/b.css';

const hello = () => console.log('hello~');

const Main = () => {
    console.log('this is Main');
    const s = Object.assign({}, new Date());
    console.log('sss', s);
};

const promise = new Promise(resolve => {
    setTimeout(() => {
        console.log('定时器执行完了e~~~');
        resolve();
    }, 1000)
});
console.log('promise', promise);

hello();
Main();
