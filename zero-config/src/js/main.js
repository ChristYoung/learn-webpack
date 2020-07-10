// 在webpack中任何类型的文件都可以当成是一个模块引入进来, 比如此处引入了一个css文件和less文件
import '../styles/common.css';
import '../styles/main.less';

const hello = () => {
    console.log('hello~');
    alert('hello!');
};

const Main = () => {
    console.log('this is Main');
    const s = Object.assign({}, new Date());
    console.log('sss', s);
    alert('main is this!!');
};

hello();
Main();
