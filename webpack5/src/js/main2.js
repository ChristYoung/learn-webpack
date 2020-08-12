// 需要在入口顶部通过 import 将 polyfill 引入，以确保它能够最先加载.
import 'babel-polyfill';

import '../styles/a.css';
import '../styles/b.css';

const hello = () => console.log('hello~');

const Main = () => {
    console.log('this is Main');
    const s = Object.assign({}, new Date());
    console.log('sss', s);
};

hello();
Main();
