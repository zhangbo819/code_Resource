# 前端工程化

本质上是为了**提升效率、减少错误**

1. 打包构建 Webpack / vite / Rollup / gulp，生产 dev
2. 组件库、微前端
3. BFF，node 层
4. 脚手架、实用脚本
5. 前端规范，代码规范、提交规范、格式化工具、TS、IDE、ESLint、prettierr
6. 线上监控平台，性能、报错、用户行为埋点

## 知识点

### 模块

Node
- CommonJS, **同步加载**

```js
// 定义模块math.js
var basicNum = 0;
function add(a, b) {
  return a + b;
}
module.exports = { //在这里写上需要向外暴露的函数、变量
  add: add,
  basicNum: basicNum
}

// 引用自定义的模块时，参数包含路径，可省略.js
var math = require('./math');
math.add(2, 5);

// 引用核心模块时，不需要带路径
var http = require('http');
http.createService(...).listen(3000);
```

浏览器

- AMD 和 require.js
  ```html
  /** 网页中引入require.js及main.js **/
  <script src="js/require.js" data-main="js/main"></script>
  ```
  ```js
  // 定义math.js模块
  define(function () {
      var basicNum = 0;
      var add = function (x, y) {
          return x + y;
      };
      return {
          add: add,
          basicNum :basicNum
      };
  });
  // 定义一个依赖underscore.js的模块
  define(['underscore'], function (_) {
    var classify = function (list) {
      _.countBy(list, function(num) {
        return num > 30 ? 'old' : 'young';
      })
    };
    return {
      classify: classify
    };
  })

  // 引用模块，将模块放在[]内
  require(['jquery', 'math'], function ($, math) {
    var sum = math.add(10,20);
    $("#sum").html(sum);
  });
  ```
- CMD
  ```js
  /** AMD写法 **/
  define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) { 
      // 等于在最前面声明并初始化了要用到的所有模块
      a.doSomething();
      if (false) {
          // 即便没用到某个模块 b，但 b 还是提前执行了
          b.doSomething()
      } 
  });

  /** CMD写法 **/
  define(function(require, exports, module) {
      var a = require('./a'); //在需要时申明
      a.doSomething();
      if (false) {
          var b = require('./b');
          b.doSomething();
      }
  });

  /** sea.js **/
  // 定义模块 math.js
  define(function(require, exports, module) {
      var $ = require('jquery.js');
      var add = function (a, b) {
          return a + b;
      }
      exports.add = add;
  });
  // 加载模块
  seajs.use(['math.js'], function (math) {
      var sum = math.add(1 + 2);
  });
  ```
- ES Module
  - 通过 ```<script type="module"><script>``` 适用
  - 自动采用严格模式
  - 每个 ESM 模块都有独立的私有作用域
  - 浏览器会以 CORS 的方式请求 JS，需要服务端支持
  - 会延迟执行，相当于加了 defer 属性

### Rollup 与 Webpack 的区别

- Rollup 设计之初相对于其他打包器由如下不同

  - 输出文件组织形式不同，其他打包器，比如 Webpack 会在输出文件中实现自定义的 require 函数，将各个模块的代码添加进行进一步包装，这种处理会对 bundle 的大小带来明显问题；而 Rollup 只是将它们在同一个文件中按顺序解决依赖关系，重命名解决全局作用域问题，不会添加另外的代码。
  - es6 的模块化语法带来了 tree shaking

- Rollup 官方解析：Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序

- Webpack 官方解析：Webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 Webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

- 应用场景对比
  使用 Rollup 的开源项目：

  - vue
  - vuex
  - vue-router

  使用 Webpack 的项目：

  - 饿了么 UI
  - mint-ui
  - vue 脚手架项目

从上面使用场景可以大概分析出，Rollup 偏向应用于 js 库，Webpack 偏向应用于前端工程，UI 库；如果你的应用场景中只是 js 代码，希望做 ES 转换，模块解析，可以使用 Rollup。如果你的场景中涉及到 css、html，涉及到复杂的代码拆分合并，建议使用 Webpack。

从应用场景上来看：

- Webpack：适合大型复杂的前端站点构建，尤其是模块化的，单页应用。
- Rollup：专门针对类库进行打包，它的优点是小巧而专注。因此现在很多我们熟知的库都都使用它进行打包，比如：Vue、React 和 three.js 等。
- parcel：零配置，傻瓜式。适用于简单的实验室项目，打包出错很难调试。不支持 Tree Shaking。更多优点：传送门。
- vite：灵活、复杂度适中，未来趋势。开发期间无需打包，越大型体验感越好。
- snowpack 与 vite 类似。

### Webpack v3、v4、v5 的区别

[v3 和 v4](https://segmentfault.com/a/1190000021881418)
[v4 和 v5](https://juejin.cn/post/6990869970385109005)

### Webpack 运行流程

- 初始化参数：解析 Webpack 配置参数，合并 shell 传入和 Webpack.config.js 文件配置的参数，形成最后的配置结果。
- 开始编译：上一步得到的参数初始化 compiler 对象，注册所有配置的插件，插件监听 Webpack 构建生命周期的事件节点，做出相应的反应，执行对象的 run 方法开始执行编译。
- 确定入口：从配置的 entry 入口，开始解析文件构建 AST 语法树，找出依赖，递归下去。
- 编译模块：递归中根据文件类型和 loader 配置，调用所有配置的 loader 对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
- 完成模块编译：在经过第 4 步使⽤ Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
- 输出资源：根据⼊⼝和模块之间的依赖关系，组装成⼀个个包含多个模块的 Chunk，再把每个 Chunk 转换成⼀个单独的⽂件加⼊到输出列表，这步是可以修改输出内容的最后机会；
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和⽂件名，把⽂件内容写⼊到⽂件系统。

> 在以上过程中，Webpack 会在特定的时间点，⼴播出特定的事件，插件在监听到感兴趣的事件后，会执⾏特定的逻辑。并且插件可以调⽤ Webpack 提供的 API ，改变 Webpack 的运⾏结果。比如 UglifyPlugin，会在 loader 转换递归完，对结果使用 UglifyJs 压缩，覆盖之前的结果。

### 什么是Webpack的热更新（Hot Module Replacement）？原理是什么？

Webpack 的热更新（Hot Module Replacement，简称HMR），在不刷新页面的前提下，将新代码替换掉旧代码。
HRM 的原理实际上是 webpack-dev-server（WDS）和浏览器之间维护了一个 websocket 服务。当本地资源发生变化后，webpack 会先将打包生成新的模块代码放入内存中，然后 WDS 向浏览器推送更新，并附带上构建时的 hash，让客户端和上一次资源进行对比。客户端对比出差异后会向 WDS 发起 Ajax 请求获取到更改后的内容（文件列表、hash），通过这些信息再向 WDS 发起 jsonp 请求获取到最新的模块代码。

### hash、chunkhash、contenthash

- hash：是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的 hash 值都会更改，并且全部文件都共用相同的 hash 值。
- chunkhash：跟入口文件的构建有关，根据入口文件构建对应的 chunk，生成每个 chunk 对应的 hash；入口文件更改，对应 chunk 的 hash 值会更改。
- contenthash：跟文件内容本身相关，根据文件内容创建出唯一 hash，也就是说文件内容更改，hash 就更改。

### 常见 Loader

- style-loader 将 css-loader 生成的样式表通过`<style>`标签，插入到页面中去。
- css-loader 用来解释` @import和url()`
- less-loader sass-loader 转化为普通 css
- postcss-loader

  - 把 css 解析成 JS 可以操作的抽象语法树 AST
  - 调用插件来处理 AST 并得到结果；
  - 所以 postcss 一般都是通过插件来处理 css，并不会直接处理，所以我们需要先安装一些插件

  - autoprefixer 加上 -webkit 等浏览器兼容前缀

- file-loader、url-loader 都是用来处理图片、字体图标等文件。
  - 当文件大小小于 limit 参数，url-loader 将文件转为 base-64 编码，用于减少 http 请求;
  - 当文件大小大于 limit 参数时，调用 file-loader 进行处理
- vue-loader 处理 vue 文件
  - VueLoaderPlugin 配合这个插件
- babel-loader 将高版本的 ES6 甚至 ES7 转为 ES5

### 常见 Plugin

- define-plugin : 定义环境变量(?)
- html-webpack-plugin，对 html 文件操作
- clean-webpack-plugin，清理上次打包内容
- mini-css-extract-plugin，从 js 中单独抽离 css 样式文件，通常在生产环境使用
- optimize-css-assets-webpack-plugin，用于生产环境，对 css 进行压缩
- copy-webpack-plugin，打包的时候，将静态资源拷贝到 dist 目录
- DllPlugin 可以将第三方库预先打包成单独的文件，减少构建时间。
- HardSourceWebpackPlugin 可以缓存中间文件，加速后续构建过程

### Compiler 和 Compilation 对象

- Compiler 对象包含了 Webpack 环境所有的的配置信息
- Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等
- Compiler 和 Compilation 的区别在于：Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只是代表了一次新的编译。

### 手写 Loader

```js
// 处理 .md 文件, 将 markdown 转成 html
const marked = require("marked");

module.exports = (source) => {
  const html = marked(source);
  return `export default ${JSON.stringify(html)}`;
};
```

### 手写 Plugin

```js
// 过滤掉打包后 js 文件中多余的注释
class MyPlugin {
  apply(compiler) {
    console.log("MyPlugin 启动");

    compiler.hooks.emit.tap("MyPlugin", (compilation) => {
      // compilation一可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        // console.log(name)
        // console.log(compilation.assets[name]. source())
        if (name.endsWith(".js")) {
          const contents = compilation.assets[name].source();
          const withoutComments = contents.replace(/\/\*\*+\*\//g, "");
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length,
          };
        }
      }
    });
  }
}
```

### Webpack 的运行流程

- 调用 Webpack 函数接收 config 配置信息，并初始化 compiler，在此期间会 apply 所有 Webpack 内置的插件;
- 调用 compiler.run 进入模块编译阶段；
- 每一次新的编译都会实例化一个 compilation 对象，记录本次编译的基本信息；
- 进入 make 阶段，即触发 compilation.hooks.make 钩子，从 entry 为入口：
  1. 调用合适的 loader 对模块源码预处理，转换为标准的 JS 模块；
  2. 调用第三方插件 acorn 对标准 JS 模块进行分析，收集模块依赖项。同时也会继续递归每个依赖项，收集依赖项的依赖项信息，不断递归下去；最终会得到一颗依赖树；
- 最后调用 compilation.seal render 模块，整合各个依赖项，最后输出一个或多个 chunk；

### Webpack 性能优化

[Webpack 进阶之性能优化(Webpack5 最新版本)](https://juejin.cn/post/7244819106342780988?searchId=202310171518474A5AA87860BF08DDDF2C#heading-23)
[webpack 5高级配置优化](https://juejin.cn/post/7121129785501155341?from=search-suggest)

- 优化构建速度
  - 定向查找
    - resolve.modules
    ```js
    module.export = {
      resolve: {
        // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
        // __diename 表示当前工作目录，也就是项目根目录
        modules: [path.resolve(__dirname, "node_modules")],
      },
    };
    ```
    - resolve.extensions
    ```js
    module.export = {
      resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    };
    ```
  - 减少执行构建的模块
    - 合理配置 noParse
    - 合理配置 IgnorePlugin
    - 合理配置 externals
    - 合理配置 loader 的 include、exclude
  - 并行构建以提升总体速度
    - HappyPack, 多进程处理 loader
    - Thread-loader，会创建多个 worker 池进行并发执行构建任务
    ```js
    {
      test: /\.js$/,
      // exclude: /node_modules/, // 排除node_modules代码不编译
      include: path.resolve(__dirname, "../src"), // 也可以用包含
      use: [
        {
          loader: "thread-loader", // 开启多进程
          options: {
            workers: threads, // 数量
          },
        },
        {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // 开启babel编译缓存
          },
        },
      ],
    },
    ```
  - 并行压缩提高构建效率
    - UglifyjsWebpackPlugin、TerserWebpackPlugin 开启 paralle
    ```js
    module.exports = {
      optimization: {
        minimizer: [
          new UglifyJsPlugin({ parallel: true }), // 开启多进程
          // new TerserPlugin({ parallel: true }), // 默认已经开启，其实无需设置
        ],
      },
    };
    ```
  - 合理使用缓存
    - babel-loader 开启缓存
    - cache-loader
    - Webpack5 配置 cache.type
    - EsLint, ESLintWebpackPlugin
    - webpack 持久化缓存, `cache: filesystem`
    ```js
    module.exports = {
      cache: {
        type: "filesystem", // 使用文件缓存
      },
    };
    ```
    - Network Cache, 开发阶段
  - OneOf，匹配上一个 loader, 剩下的就不匹配了
  ```js
  {
    module: {
      rules: [
        {
          oneOf: [
            {
              // 用来匹配 .css 结尾的文件
              test: /\.css$/,
              // use 数组里面 Loader 执行顺序是从右到左
              use: ["style-loader", "css-loader"],
            },
          ]
        }
    }
  }
  ```
- 优化构建结果
  - 压缩 html
    - html-webpack-plugin，minify
    ```js
    module.export = {
      plugins: [
        new HtmlWebpackPlugin({
          // 动态生成 html 文件
          template: "./index.html",
          minify: {
            // 压缩HTML
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: true, // 删除空⽩符与换⾏符
            minifyCSS: true, // 压缩内联css
          },
        }),
      ],
    };
    ```
  - 压缩 js
    - v4 以前 uglifyjs-webpack-plugin
      ```js
      const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 需要安装

      module.exports = {
        module: {
          rules: [
            {
              test: /\.jsx?$/,
              use: ["babel-loader"],
              exclude: /node_modules/, //排除 node_modules 目录
            },
          ]
        },
        optimization: {
          // 是否需要压缩
          minimize: true, // 开发环境需要开启
          // 配置压缩工具
          minimizer: [
            new UglifyJsPlugin({})
          ],
        },
      }
      ```
    - v4 后默认使用 terser-webpack-plugin，可以开启 parallel 参数，使用多进程压缩
      ```js
      const TerserPlugin = require("terser-webpack-plugin"); // webpack5 内置，不需要再单独安装

      optimization: {
        // 是否需要压缩
        minimize: true,
        // 配置压缩工具
        minimizer: [
          new TerserPlugin({// 在这里自定义配置}),
        ],
      },
      ```
  - 压缩 css
    - 首先用 mini-css-extract-plugin ，将 css 文件单独抽离出来
      ```js
      {
        module: {
          rules: [
            {
              test: /\.css$/,
              // use: ["style-loader", "css-loader"],
              use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
          ],
        },
        plugins: [
          new MiniCssExtractPlugin()
        ]
      }
      ```
    - 对于 Webpack4 及以下 使用的是 optimize-css-assets-webpack-plugin 插件来压缩 css。
    - 在 Webpack5 中推荐使用的是 css-minimizer-webpack-plugin。
    - PurgeCSS，无用 css 的擦除
      ```js
      const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
      const path = require("path");
      const glob = require("glob");

      plugins: [
        // ...
        new PurgecssPlugin({
          // 这里我的样式在根目录下的index.html里面使用，所以配置这个路径
          paths: glob.sync(`${path.join(__dirname)}/index.html`, { nodir: true }),
        }),
      ]
      ```
  - 压缩 image
    - image-webpack-loader
    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.(png|jpg|gif|jpeg|webp|svg)$/,
            use: [
              "file-loader",
              {
                loader: "image-webpack-loader",
                options: {
                  mozjpeg: {
                    progressive: true,
                  },
                  // optipng.enabled: false will disable optipng
                  optipng: {
                    enabled: false,
                  },
                  pngquant: {
                    quality: [0.65, 0.9],
                    speed: 4,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                },
              },
            ],
            exclude: /node_modules/, //排除 node_modules 目录
          },
        ]
      },
    }
    ```
  - 按需加载
    - import()
  - 提前加载（prefetch 和 preload）
    - prefetch, /* WebpackPrefetch: true */
    - preload, /* WebpackPreload: true */
    - prefetch 与 preload 的区别
      1. preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
      2. preload chunk 具有中等优先级，并立即下载。prefetch chunk  在浏览器闲置时下载。
      3. preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
      4. 浏览器支持程度不同，需要注意。
  - Code Splitting (代码分割)
    - SplitChunksPlugin, JS 分割合并
    ```js
    module.exports = {
      //...
      optimization: {
        splitChunks: {
          chunks: 'async', // 值有 `all`，`async` 和 `initial`
          minSize: 20000, // 生成 chunk 的最小体积（以 bytes 为单位）。
          minRemainingSize: 0,
          minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
          maxAsyncRequests: 30, // 按需加载时的最大并行请求数。
          maxInitialRequests: 30, // 入口点的最大并行请求数。
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\/]node_modules[\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
    };
    ```
    - MiniCssExtractPlugin，css 分割
  - Tree Shaking (摇树)
    - optimization.usedExports: true, js
    - purgecss-webpack-plugin, css
    ```js
    // webpack.config.js
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    // ...
    {
      test: /\.less?$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      exclude: /node_modules/, //排除 node_modules 目录
    },

    plugins: [
      // ...
      new MiniCssExtractPlugin(),
    ],
    ```
  - Gzip
    - CompressionWebpackPlugin
    ```js
    const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 需要安装

    module.exports = {
      plugins: [
        new CompressionWebpackPlugin()
      ]
    }
    ```
  - 作用提升 (Scope Hoisting)
- 打包分析工具
  - speed-measure-webpack-plugin，能够看到各部分耗时