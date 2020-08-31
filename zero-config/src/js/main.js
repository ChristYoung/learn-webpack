// 在webpack中任何类型的文件都可以当成是一个模块引入进来, 比如此处引入了一个css文件和less文件
import bar, { foo } from './a';
bar();
foo();
