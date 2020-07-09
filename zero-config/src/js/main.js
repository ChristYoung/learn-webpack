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
