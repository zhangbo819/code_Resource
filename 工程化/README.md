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


从应用场景上来看：

- webpack：适合大型复杂的前端站点构建，尤其是模块化的，单页应用。
- rollup：专门针对类库进行打包，它的优点是小巧而专注。因此现在很多我们熟知的库都都使用它进行打包，比如：Vue、React和three.js等。
- parcel：零配置，傻瓜式。适用于简单的实验室项目，打包出错很难调试。不支持Tree Shaking。更多优点：传送门。
- vite：灵活、复杂度适中，未来趋势。开发期间无需打包，越大型体验感越好。
- snowpack与vite类似。

### webpack v3、v4、v5 的区别

[v3 和 v4](https://segmentfault.com/a/1190000021881418)
[v4 和 v5](https://juejin.cn/post/6990869970385109005)

### webpack 运行流程

- 初始化参数：解析webpack配置参数，合并shell传入和webpack.config.js文件配置的参数，形成最后的配置结果。
- 开始编译：上一步得到的参数初始化compiler对象，注册所有配置的插件，插件监听webpack构建生命周期的事件节点，做出相应的反应，执行对象的 run 方法开始执行编译。
- 确定入口：从配置的entry入口，开始解析文件构建AST语法树，找出依赖，递归下去。
- 编译模块：递归中根据文件类型和loader配置，调用所有配置的loader对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
- 完成模块编译：在经过第4步使⽤ Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
- 输出资源：根据⼊⼝和模块之间的依赖关系，组装成⼀个个包含多个模块的 Chunk，再把每个 Chunk 转换成⼀个单独的⽂件加⼊到输出列表，这步是可以修改输出内容的最后机会；
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和⽂件名，把⽂件内容写⼊到⽂件系统。

> 在以上过程中，Webpack 会在特定的时间点，⼴播出特定的事件，插件在监听到感兴趣的事件后，会执⾏特定的逻辑。并且插件可以调⽤ Webpack 提供的 API ，改变 Webpack 的运⾏结果。比如UglifyPlugin，会在loader转换递归完，对结果使用UglifyJs压缩，覆盖之前的结果。


### hash、chunkhash、contenthash

- hash：是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值。
- chunkhash：跟入口文件的构建有关，根据入口文件构建对应的chunk，生成每个chunk对应的hash；入口文件更改，对应chunk的hash值会更改。
- contenthash：跟文件内容本身相关，根据文件内容创建出唯一hash，也就是说文件内容更改，hash就更改。

### 常见 Loader

- style-loader 将css-loader生成的样式表通过`<style>`标签，插入到页面中去。
- css-loader 用来解释` @import和url()`
- less-loader sass-loader 转化为普通 css
- postcss-loader
    - 把css解析成JS可以操作的抽象语法树AST
    - 调用插件来处理AST并得到结果；
    - 所以postcss一般都是通过插件来处理css，并不会直接处理，所以我们需要先安装一些插件
    
    - autoprefixer 加上 -webkit等浏览器兼容前缀
- file-loader、url-loader 都是用来处理图片、字体图标等文件。
    - 当文件大小小于limit参数，url-loader将文件转为base-64编码，用于减少http请求;
    - 当文件大小大于limit参数时，调用file-loader进行处理
- vue-loader 处理 vue 文件
    - VueLoaderPlugin 配合这个插件
- babel-loader 将高版本的ES6甚至ES7转为ES5

### 常见 Plugin

- html-webpack-plugin，对 html 文件操作
- clean-webpack-plugin，清理上次打包内容
- mini-css-extract-plugin，从js中单独抽离css样式文件，通常在生产环境使用
- optimize-css-assets-webpack-plugin，用于生产环境，对css进行压缩
- copy-webpack-plugin，打包的时候，将静态资源拷贝到dist目录


### compiler 和 compilation 对象

- Compiler 对象包含了 Webpack 环境所有的的配置信息
- Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等
- Compiler 和 Compilation 的区别在于：Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只是代表了一次新的编译。
