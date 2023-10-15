# 前端工程化

本质上是为了**提升效率、减少错误**

1. 打包构建 webpack / vite / rollup / gulp，生产 dev
2. 组件库、微前端
3. BFF，node 层
4. 脚手架、实用脚本
5. 前端规范，代码规范、提交规范、格式化工具、TS、IDE、ESLint、prettierr
6. 线上监控平台，性能、报错、用户行为埋点

## 知识点

### rollup 与 webpack 的区别

- rollup设计之初相对于其他打包器由如下不同

输出文件组织形式不同，其他打包器，比如webpack会在输出文件中实现自定义的require函数，将各个模块的代码添加进行进一步包装，这种处理会对bundle的大小带来明显问题；而rollup只是将它们在同一个文件中按顺序解决依赖关系，重命名解决全局作用域问题，不会添加另外的代码。
es6的模块化语法带来了tree shaking


- Rollup官方解析：Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序

- webpack官方解析：webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

- 应用场景对比
使用Rollup的开源项目：

vue
vuex
vue-router

使用webpack的项目：

饿了么UI
mint-ui
vue脚手架项目

从上面使用场景可以大概分析出，Rollup偏向应用于js库，webpack偏向应用于前端工程，UI库；如果你的应用场景中只是js代码，希望做ES转换，模块解析，可以使用Rollup。如果你的场景中涉及到css、html，涉及到复杂的代码拆分合并，建议使用webpack。
