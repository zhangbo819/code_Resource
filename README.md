<!-- (https://github.com/poetries/FE-Interview-Questions/)[https://github.com/poetries/FE-Interview-Questions/] -->

# 目录

[toc]

<!-- # 基础知识

* [JS基础](#一js基础)
  >
  > * [继承](#继承)
  > * [prototype 和 \_\_proto\_\_](#prototype-和-__proto__)
* ES6
* [CSS基础 BFC、回流重绘](#三css基础)
* 网络基础 http、dns、tcp、cdn、缓存

# 工程化

* Webpack
* Babel
* 前端安全
* 性能优化
* 部署发布

# 框架/源码

* Vue、React 工作机制、各自特点
* Diff
* MVVM, MVC, MVP
* Vue Computed, Wactch实现原理，为什么Computed可以依赖另一个Computed

# node

* 流、文件系统
* 网络
* 子进程
* 多线程
* koa

# 其他

* TS

# 计算机基础

* 算法
* 数据结构
* 设计模式

# 面试题

* 待定 -->

# 基础知识

## 一、JS基础

[外链 - 字节跳动最爱考的前端面试题：JavaScript 基础](https://juejin.cn/post/6934500357091360781)
[外链 -「2021」高频前端面试题汇总之JavaScript篇（上）](https://juejin.cn/post/6940945178899251230)
[外链 - 32个手写JS，巩固你的JS基础（面试高频）](https://juejin.cn/post/6875152247714480136)
[外链 - 2万字 | 前端基础拾遗90问](https://juejin.cn/post/6844904116552990727)
[外链 - 冴羽的博客](https://github.com/mqyqingfeng/Blog)
[外链 - sl1673495的博客](https://github.com/sl1673495/blogs)

### JS数据类型

[外链 - 原链接](https://juejin.cn/post/6844903870712283149)

基本类型分为以下六种：

1. string（字符串）
2. boolean（布尔值）
3. number（数字）
4. symbol（符号）
5. null（空值）
6. undefined（未定义）

> * string 、number 、boolean 和 null  undefined 这五种类型统称为原始类型（Primitive），表示不能再细分下去的基本类型;
>
> * symbol是ES6中新增的数据类型，symbol 表示独一无二的值，通过 Symbol 函数调用生成，由于生成的 symbol 值为原始类型，所以 Symbol 函数不能使用 new 调用；
>
> * null 和 undefined 通常被认为是特殊值，这两种类型的值唯一，就是其本身。

对象类型

* 对象类型也叫引用类型，array和function是对象的子类型。对象在逻辑上是属性的无序集合，是存放各种值的容器。对象值存储的是引用地址，所以和基本类型值不可变的特性不同，对象值是可变的。

### 继承

[外链 -  JS原型链与继承别再被问倒了](https://juejin.cn/post/6844903475021627400)

* 几种继承方法，各自优缺点

* 实现一个寄生组合继承

```js

function Parent(name) {
  this.name = name;
  this.say = () => {
    console.log(111);
  };
}
Parent.prototype.play = () => {
  console.log(222);
};
function Children(name) {
  Parent.call(this);
  this.name = name;
}
Children.prototype = Object.create(Parent.prototype);
Children.prototype.constructor = Children;

// let child = new Children("111");
// // console.log(child.name);
// // child.say();
// // child.play();

```

### prototype 和 \_\_proto\_\_

[外链 - js中__proto__和prototype的区别和关系？](https://www.zhihu.com/question/34183746)

```js

function foo () {}

foo.__proto__ === Function.prototype // true

// 向下

var f1 = new foo()

f1.__proto__ === foo.prototype // true

// 向上
// 函数
Function.__proto__ === Function.prototype // true
Function.prototype.__proto__ === Object.prototype // true


// 对象
Object.__proto__ === Function.prototype // true
Object.prototype.__proto__ === null // true 


```

> prototype 是函数的 原型对象，是个 **对象**
> \_\_proto\_\_是 构造该对象的构造函数的原型对象，（**也是个原型对象, 只不过是他父级的原型对象**）
> \_\_proto\_\_ 正常只有对象有，但js里**函数也是对象**，所以所有的函数也都有他的\_\_proto\_\_，**指向他父级的构造函数的原型对象**
> Function是产生函数的函数，本质是函数，函数都有 \_\_proto\_\_，他的\_\_proto\_\_是他自己的原型 (函数最顶层的__proto__是Function.prototype)
> 所有函数的原型对象的__proto__都是 Object.prototype (因为原型对象也是对象)
> Object是产生对象的函数，本质也是函数，他的\_\_proto\_\_指向的是创造函数的函数Function的prototype
> 而Object的原型对象，本质是也对象，其他的对象的\_\_proto\_\_会指向他，而他的\_\_proto\_\_是 null

精简版

<!-- > \_\_proto\_\_ 指向构造他的构造函数的原型对象 -->
> 函数是特殊的对象，具有对象共有的特点
> 对象有 \_\_proto\_\_，所以函数也有\_\_proto\_\_
> 无论是函数还是对象他的 \_\_proto\_\_，都是一个对象
> 对象的\_\_proto\_\_ 是 Object.prototype， 而Object.prototype的 \_\_proto\_\_是null
> 函数的\_\_proto\_\_ 是 Function.prototype

### new

new 操作符做了哪些事

* 创建一个新的对象
* 将这个对象的__proto__指向函数的原型对象（链接到原型）
* 将this绑定到这个函数并执行
* 如果有执行结果为对象，则返回执行结果，否则，返回创造的对象

手写 new

```js

function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype);
  let res = fn.call(obj, ...args);
  if (res && (typeof res === "object" || typeof res === "function")) {
    return res;
  }
  return obj;
}


// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }
// Person.prototype.say = function() {
//   console.log(this.age);
// };
// let p1 = myNew(Person, "lihua", 18);
// console.log(p1.name);
// console.log(p1);
// p1.say();


```

### 手写 instanceof

```js

// 模拟 instanceof
function instance_of(L, R) {
  //L 表示左表达式，R 表示右表达式
  var O = R.prototype; // 取 R 的显示原型
  L = L.__proto__; // 取 L 的隐式原型
  while (true) {
    if (L === null) return false;
    if (O === L)
      // 这里重点：当 O 严格等于 L 时，返回 true
      return true;
    L = L.__proto__;
  }
}

```

### 作用域

程序中定义变量的区域，他绝对了当前执行代码对变量的访问权限

[外链 - 面试官：说说作用域和闭包吧](https://juejin.cn/post/6844904165672484871)

### 事件循环 Event Loop

> [外链 - 浏览器与Node事件循环有何不同](https://juejin.cn/post/6844903761949753352#heading-13)

Node运行机制如下:

* V8引擎解析JavaScript脚本。
* 解析后的代码，调用Node API。
* libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。V8引擎再将结果返回给用户。

```js

console.log('start')
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function() {
  console.log('promise3')
})
console.log('end')
//start=>end=>promise3=>timer1=>timer2=>promise1=>promise2

```

* 一开始执行栈的同步任务（这属于宏任务）执行完毕后（依次打印出start end，并将2个timer依次放入timer队列）,会先去执行微任务（**这点跟浏览器端的一样**），所以打印出promise3
* 然后进入timers阶段，执行timer1的回调函数，打印timer1，并将promise.then回调放入microtask队列，同样的步骤执行timer2，打印timer2；这点跟浏览器端相差比较大，**timers阶段有几个setTimeout/setInterval都会依次执行**，并不像浏览器端，每执行一个宏任务后就去执行一个微任务（关于Node与浏览器的 Event Loop 差异，下文还会详细介绍）。

### 宏任务微任务

```js

console.log('Promise before')
async1()
new Promise((r) => {
    console.log('Promise in')
    setTimeout(() => console.log('setTimeout 1'))
    setTimeout(() => {
        console.log('Promise 2 before')
        new Promise((r) => {
            console.log('Promise 2 in')
            r(1)
        }).then(r => console.log('Promise 2 then'))
        console.log('Promise 2 after')
    })
    setTimeout(() => {
        console.log('Promise 3 before')
        new Promise((r) => {
            console.log('Promise 3 in')
            r(1)
        }).then(r => console.log('Promise 3 then'))
        console.log('Promise 3 after')
    }, 0)
    r(222)
}).then(r => console.log('Promise then'))
console.log('Promise after')

async function async1 () {
    console.log('async 1 before')
    await async2()
    console.log('async 1 after')
}
async function async2 () {
    console.log('async 2 in')
}

```

输出

```text

Promise before
async 1 before
async 2 in
Promise in
Promise after
async 1 after
Promise then
undefined
setTimeout 1
Promise 2 before
Promise 2 in
Promise 2 after
Promise 2 then
Promise 3 before
Promise 3 in
Promise 3 after
Promise 3 then

```

### JavaScript脚本延迟加载的方式有哪些

延迟加载就是等页面加载完成之后再加载 JavaScript 文件。 js 延迟加载有助于提高页面加载速度。

一般有以下几种方式：

* defer 属性： 给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。
* async 属性： 给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。
* 动态创建 DOM 方式： 动态创建 DOM 标签的方式，可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。
* 使用 setTimeout 延迟方法： 设置一个定时器来延迟加载js脚本文件
* 让 JS 最后加载： 将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。

### 简单防抖

```js

function debounce (fn, wait = 1000) {
  let timeOutId

  return function () {
    let context = this

    if (timeOutId) {
      clearTimeout(timeOutId)
    }

    timeOutId = setTimeout(() => {
      fn.apply(context, arguments)
    }, wait)
  }
}


```

### 带立即执行参数

```js

function debounceImmediate (fn, wait = 1000, immediate) {
  let timeOutId, context, args

  const later = (immediate) => setTimeout(() => {
    if (!immediate) {
      fn.apply(context, args)
      timeOutId = context = args = null
    }
  }, wait)

  return function () {
    if (!timeOutId) {
      timeOutId = later(true)

      if (immediate) {
        fn.apply(this, arguments)
      }

      context = this
      args = arguments
    } else {
      clearTimeout(timeOutId)
      timeOutId = later(false)
    }
  }
}

```

### 节流

```js

function throttle (fn, wait) {
  let timeoutId = null
  return function () {
    let context = this
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        fn.apply(context, arguments)
        timeoutId = null
      }, wait)
    }
  }
}


```

## 二、ES6

[外链 - 阮一峰文档](https://es6.ruanyifeng.com/#docs/reflect)

Reflect
ES6为了操作对象而新增的api，可以配合proxy使用，有object上的一些方法，同时将一些命令式的语法，转化为函数式的写法，比如 in、delete

Generator

一种可暂停执行的特殊函数

## 三、CSS基础

### 标准盒子和怪异盒子

[外链 - 原链接](https://www.cnblogs.com/sun-web/p/10694697.html)

怪异盒模型

CSS3的box-sizing

> box-sizing语法：
box-sizing: content-box || border-box || inherit || initial

> 当设置为box-sizing:content-box时，将采用标准模式解析计算，也是默认模式；
当设置为box-sizing:border-box时，将采用怪异模式解析计算；

IE盒模型或怪异盒模型显而易见的区别就是，width和height除了content区域外，还包含padding和border。

> 只要在文档首部加了doctype申明，即使用了标准盒模型，而不加，则会由浏览器自己决定，比如，ie 浏览器中显示“ie盒子模型”，在 ff 浏览器中显示“标准 w3c 盒子模型”。
> 当用编辑器新建一个html页面的时候最顶上都会有一个DOCTYPE标签，不定义DOCTYPE，会触发怪异模式

### BFC

#### 什么是BFC

BFC 全称为**块级格式化上下文** (Block Formatting Context) 。
BFC是 W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行定位以及与其他元素的关系和相互作用，当涉及到可视化布局的时候，Block Formatting Context提供了一个环境，HTML元素在这个环境中按照一定规则进行布局。一个环境中的元素不会影响到其它环境中的布局。
> 比如浮动元素会形成BFC，浮动元素内部子元素的主要受该浮动元素影响，两个浮动元素之间是互不影响的。
> 这里有点类似一个BFC就是一个独立的行政单位的意思。可以说BFC就是一个作用范围，把它理解成是一个独立的容器，并且这个容器里box的布局与这个容器外的box毫不相干。

#### 触发BFC的条件

* 根元素或其它包含它的元素
* 浮动元素 (只有 right 和 left)
* 绝对定位元素 (元素具有 position 为 absolute 或 fixed, sticky、relative 不会触发 bfc)
* display: flow-root (专门构建BFC，没有副作用, 元素会变成块级)
* 内联块 (元素具有 display: inline-block)
* 弹性盒（flex 或 inline-flex）
* 表格单元格 (元素具有 display: table-cell，HTML表格单元格默认属性)
* 表格标题 (元素具有 display: table-caption, HTML表格标题默认属性)
* 具有overflow 且值不是 visible 的块元素
* column-span: all
  >
  > * 作用：规定元素应横跨多少列。
  > * column-span: 1|all;
  > * 说明：1 元素应横跨一列。all 元素应横跨所有列。

#### BFC的约束规则

* 内部的盒会在垂直方向一个接一个排列（可以看作BFC中有一个的常规流）
* 处于同一个BFC中的元素相互影响，可能会发生外边距重叠
* 每个元素的margin box的左边，与容器块border box的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
* 计算BFC的高度时，考虑BFC所包含的所有元素，连浮动元素也参与计算
* 浮动盒区域不叠加到BFC上

#### BFC可以解决的问题

* 垂直外边距重叠问题
* 去除浮动
* 自适用两列布局（float + overflow）

### 绝对定位

[内链 - 例子](./CSS/子元素相当于父元素的什么进行定位.html)

> top, left, right, bottom不设置或为auto时，相对于padding内
> 设置为0时，相对于border内

### flex布局

[外链 - Flex布局\弹性布局--面试题](https://juejin.cn/post/6881565341856563213)

### flex: 1

> flex 实际上是 flex-grow、flex-shrink 和 flex-basis 三个属性的缩写。

```text

flex: 1;

// 等于

flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;

```

* flex-grow：定义项目的的放大比例；

```text

默认为0，即 即使存在剩余空间，也不会放大；
所有项目的flex-grow为1：等分剩余空间（自动放大占位）；
flex-grow为n的项目，占据的空间（放大的比例）是flex-grow为1的n倍。

```

* flex-shrink：定义项目的缩小比例；

```text

默认为1，即 如果空间不足，该项目将缩小；
所有项目的flex-shrink为1：当空间不足时，缩小的比例相同；
flex-shrink为0：空间不足时，该项目不会缩小；
flex-shrink为n的项目，空间不足时缩小的比例是flex-shrink为1的n倍。


```

* flex-basis： 定义在分配多余空间之前，项目占据的主轴空间（main size），浏览器根据此属性计算主轴是否有多余空间

```text

默认值为auto，即 项目原本大小；
设置后项目将占据固定空间。

```

## 四、HTTP

[外链 - http详解](https://juejin.cn/post/6844904045572800525)

[外链 - 基础知识](https://juejin.cn/post/6844904087524229133)

### GET 和 POST 的区别

* 传送方式：GET 通过地址栏传输，POST 通过报文传输
* 传送长度：GET 参数有长度限制（受限于url长度），而 POST 无限制
* 安全性：GET 的安全性较差，因为所发送的数据是 URL 的一部分。POST 比 GET更安全，因为参数不会被保存在浏览器历史或web服务器日志中。
* GET 可以被缓存，POST 不能被缓存
* GET 产生一个 TCP 数据包：
  > 对于 GET 方式的请求，浏览器会把 http header 和 data一并发送出去，服务器响应200(返回数据);
* POST 产生两个 TCP数据包：
  > 对于 POST，浏览器先发送header，服务器响应 100 continue，浏览器再发送data，服务器响应 200 ok（返回数据）

### 缓存

#### 你能说说缓存么

小提示：如果平常有遇到过缓存的坑或者很好的利用缓存，可以讲解一下自己的使用场景。如果没有使用注意过缓存问题你也可以尝试讲解一下和我们息息相关的Webpack构建（每一次构建静态资源名称的hash值都会变化），它其实就跟缓存相关。有兴趣的同学可以查看张云龙的博客大公司里怎样开发和部署前端代码？。

> 缓存分为强缓存和协商缓存。强缓存不过服务器，协商缓存需要过服务器，协商缓存返回的状态码是304。
> 两类缓存机制可以同时存在，强缓存的优先级高于协商缓存。当执行强缓存时，如若缓存命中，则直接使用缓存数据库中的数据，不再进行缓存协商。

#### 协商缓存

协商缓存需要进行对比判断是否可以使用缓存。浏览器第一次请求数据时，服务器会将缓存标识与数据一起响应给客户端，客户端将它们备份至缓存中。再次请求时，客户端会将缓存中的标识发送给服务器，服务器根据此标识判断。若未失效，返回304状态码，浏览器拿到此状态码就可以直接使用缓存数据了。

Last-Modified：服务器在响应请求时，会告诉浏览器资源的最后修改时间。
if-Modified-Since：浏览器再次请求服务器的时候，请求头会包含此字段，后面跟着在缓存中获得的最后修改时间。服务端收到此请求头发现有if-Modified-Since，则与被请求资源的最后修改时间进行对比，如果一致则返回304和响应报文头，浏览器只需要从缓存中获取信息即可。

* 如果真的被修改：那么开始传输响应一个整体，服务器返回：200 OK
* 如果没有被修改：那么只需传输响应header，服务器返回：304 Not Modified
if-Unmodified-Since: 从某个时间点算起, 是否文件没有被修改，使用的是相对时间，不需要关心客户端和服务端的时间偏差。
* 如果没有被修改：则开始`继续'传送文件，服务器返回: 200 OK
* 如果文件被修改：则不传输，服务器返回: 412 Precondition failed (预处理错误)
这两个的区别是一个是修改了才下载一个是没修改才下载。如果在服务器上，一个资源被修改了，但其实际内容根本没发生改变，会因为Last-Modified时间匹配不上而返回了整个实体给客户端（即使客户端缓存里有个一模一样的资源）。为了解决这个问题，HTTP1.1推出了Etag。
Etag：服务器响应请求时，通过此字段告诉浏览器当前资源在服务器生成的唯一标识（生成规则由服务器决定）
If-Match：条件请求，携带上一次请求中资源的ETag，服务器根据这个字段判断文件是否有新的修改
If-None-Match： 再次请求服务器时，浏览器的请求报文头部会包含此字段，后面的值为在缓存中获取的标识。服务器接收到次报文后发现If-None-Match则与被请求资源的唯一标识进行对比。
* 不同，说明资源被改动过，则响应整个资源内容，返回状态码200。
* 相同，说明资源无心修改，则响应header，浏览器直接从缓存中获取数据信息。返回状态码304.
但是实际应用中由于Etag的计算是使用算法来得出的，而算法会占用服务端计算的资源，所有服务端的资源都是宝贵的，所以就很少使用Etag了。
* 浏览器地址栏中写入URL，回车浏览器发现缓存中有这个文件了，不用继续请求了，直接去缓存拿（最快）
* F5就是告诉浏览器，别偷懒，好歹去服务器看看这个文件是否有过期了。于是浏览器就胆胆襟襟的发送一个请求带上If-Modify-since
* Ctrl+F5告诉浏览器，你先把你缓存中的这个文件给我删了，然后再去服务器请求个完整的资源文件下来。于是客户端就完成了强行更新的操作

##### 二图胜千言

第一次请求

<img src="https://images2015.cnblogs.com/blog/408483/201605/408483-20160525182843100-1556227104.png" />

浏览器后续请求时

<img src="https://images2015.cnblogs.com/blog/408483/201605/408483-20160525182943272-204994049.png" />


#### 缓存场景

对于大部分的场景都可以使用强缓存配合协商缓存解决，但是在一些特殊的地方可能需要选择特殊的缓存策略

* 对于某些不需要缓存的资源，可以使用 Cache-control: no-store ，表示该资源不需要缓存
* 对于频繁变动的资源，可以使用 Cache-Control: no-cache 并配合 ETag 使用，表示该资源已被缓存，但是每次都会发送请求询问资源是否更新
* 对于代码文件来说，通常使用 Cache-Control: max-age=31536000 并配合策略缓存使用，然后对文件进行指纹处理，一旦文件名变动就会立刻下载新的文件


# 框架

## Vue Router原理

是相当于在不刷新页面的情况下，动态局部刷新Vue组件，实现*跳转*的操作

### hash模式

基于location.hash，就是URL#号后面的值，这部分变化页面不会刷新，所以可以将定义的路由和参数都在#号后，达到切换路由的效果
通过 hashchange 事件，获取当前路由，切换显示页面上的组件

特性：

- hash只是客户端的状态，当向服务器发起请求时，hash不会被发送
- hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换。
- 我们可以使用 hashchange 事件来监听 hash 的变化。


可以通过a标签的href, 跳转触发 hashchange
```html
<a href="#search">search</a>

```

也可以主动跳转，触发 hashchange
```js
location.hash="#search"

```

### history模式

利用 H5 的 History API，其中的 history.pushState() 和 history.repalceState()，同样可以**改变当前url的同时不刷新当前页面**

但由于url会变化，所以刷新页面后请求的地址也发生了变化，需要对服务器进行配置

特性：

- pushState 和 repalceState 的标题（title）：一般浏览器会忽略，最好传入 null ；
- 我们可以使用 popstate  事件来监听 url 的变化；
- history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面渲染；

# 工程化

## Webpack

## Babel

Babel 是一个 JavaScript 编译器。他把最新版的 javascript 编译成当下可以执行的版本，简言之，利用 babel 就可以让我们在当前的项目中随意的使用这些新最新的 es6，甚至 es7 的语法。
Babel 的三个主要处理步骤分别是： 解析（parse），转换（transform），生成（generate）。

> * 解析
将代码解析成抽象语法树（AST），每个 js 引擎（比如 Chrome 浏览器中的 V8 引擎）都有自己的 AST 解析器，而 Babel 是通过 Babylon 实现的。在解析过程中有两个阶段：词法分析和语法分析，词法分析阶段把字符串形式的代码转换为令牌（tokens）流，令牌类似于 AST 中节点；而语法分析阶段则会把一个令牌流转换成 AST 的形式，同时这个阶段会把令牌中的信息转换成 AST 的表述结构。
> * 转换
在这个阶段，Babel 接受得到 AST 并通过 babel-traverse 对其进行深度优先遍历，在此过程中对节点进行添加、更新及移除操作。这部分也是 Babel 插件介入工作的部分。
> * 生成
将经过转换的 AST 通过 babel-generator 再转换成 js 代码，过程就是深度优先遍历整个 AST，然后构建可以表示转换后代码的字符串。

还想深入了解的可以看 [外链 - Babel 原理](https://juejin.cn/post/6844903760603398151)

## SSR

### SPA单页面应用和SSR服务端渲染的区别

[SPA单页面应用和SSR服务端渲染的区别](https://blog.csdn.net/lbPro0412/article/details/107818239)

## 安全

### XSS

XSS，即为（Cross Site Scripting）, 中文名为跨站脚本，是发生在目标用户的浏览器层面上的，当渲染DOM树的过程发生了不在预期内执行的js代码时，就发生了XSS 攻击。

大多数XSS攻击的主要方式是嵌入一段远程或者第三方域上JS代码。实际上是在目标网站的作用域下执行了这段代码。

XSS防御的总体思路是

* cookie 设置 httpOnly

* 转义页面上的输入内容和输出内容

* 输入过滤，一般是用于对于输入格式的检查，过滤掉会导致脚本执行的相关内容

### CSRF

CSRF (Cross Site Request Forgery, 跨站请求伪造)，字面理解意思就是在别的站点伪造了一个请求。专业术语来说就是在受害者访问一个网站时，其 Cookie 还没有过期的情况下，攻击者伪造一个链接地址发送受害者并欺骗让其点击，从而形成 CSRF 攻击。

防御 CSRF 攻击主要有三种策略：

* 验证 HTTP Referer 字段；
* 在请求地址中添加 token 并验证
* 在 HTTP 头中自定义属性并验证

## TS

[外链 - 掘金1.8w字文档](https://juejin.cn/post/6872111128135073806)

# 性能优化

[外链 - 前端性能优化 24 条建议（2020）](https://juejin.cn/post/6892994632968306702#heading-11)

# 其他


# 计算机基础

## 算法

1. 排序
2. 双指针
3. 动态规划
4. 贪心
5. 深搜、广搜

## 数据结构

[内链 - 数据结构](./数据结构/README.md)

## 设计模式

# 面试题

[内链 - 面试题](./面试题/README.md)

# 学习资料

[外链 - 迷茫时学习Node.js最好的方法](https://zhuanlan.zhihu.com/p/29625882)
[外链 - 很棒的微型 npm 包 (适合学习源码)](https://github.com/parro-it/awesome-micro-npm-packages)

# 参考链接

[外链 - 面试分享：两年工作经验成功面试阿里P6总结](https://juejin.cn/post/6844903928442667015)
