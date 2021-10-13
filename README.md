<!-- (https://github.com/poetries/FE-Interview-Questions/)[https://github.com/poetries/FE-Interview-Questions/] -->

# 大纲

## 基础知识

* JS基础
* ES6
* CSS基础 BFC、回流重绘
* 网络基础 http、dns、tcp、cdn、缓存

## 工程化

* Webpack
* Babel
* 前端安全
* 性能优化
* 部署发布

## 框架/源码

* Vue、React 工作机制、各自特点
* Diff
* MVVM, MVC, MVP
* Vue Computed, Wactch实现原理，为什么Computed可以依赖另一个Computed

## node

* 流、文件系统
* 网络
* 子进程
* 多线程
* koa

## 其他

* TS

## 计算机基础

* 算法
* 数据结构
* 设计模式

## 面试题

* 待定

# 正文

## 基础知识

### 一、JS基础

#### 继承

[参考链接 JS原型链与继承别再被问倒了](https://juejin.cn/post/6844903475021627400)

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

#### prototype 和 \_\_proto\_\_

[原链接摆上](https://www.zhihu.com/question/34183746)

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

#### new

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

#### 作用域

程序中定义变量的区域，他绝对了当前执行代码对变量的访问权限

<https://juejin.cn/post/6844904165672484871>

#### 事件循环 Event Loop

> [浏览器与Node事件循环有何不同](https://juejin.cn/post/6844903761949753352#heading-13)

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

#### 宏任务微任务

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

### 二、ES6

阮一峰文档 <https://es6.ruanyifeng.com/#docs/reflect>

Reflect
ES6为了操作对象而新增的api，可以配合proxy使用，有object上的一些方法，同时将一些命令式的语法，转化为函数式的写法，比如 in、delete

Generator

一种可暂停执行的特殊函数

### 三、CSS基础

#### flex布局

<https://juejin.cn/post/6881565341856563213>

#### flex: 1

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

### 五、HTTP

http详解  <https://juejin.cn/post/6844904045572800525>

基础知识 <https://juejin.cn/post/6844904087524229133>

#### 缓存

##### 你能说说缓存么

小提示：如果平常有遇到过缓存的坑或者很好的利用缓存，可以讲解一下自己的使用场景。如果没有使用注意过缓存问题你也可以尝试讲解一下和我们息息相关的Webpack构建（每一次构建静态资源名称的hash值都会变化），它其实就跟缓存相关。有兴趣的同学可以查看张云龙的博客大公司里怎样开发和部署前端代码？。

> 缓存分为强缓存和协商缓存。强缓存不过服务器，协商缓存需要过服务器，协商缓存返回的状态码是304。两类缓存机制可以同时存在，强缓存的优先级高于协商缓存。当执行强缓存时，如若缓存命中，则直接使用缓存数据库中的数据，不再进行缓存协商。

##### 协商缓存

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

##### 缓存场景

对于大部分的场景都可以使用强缓存配合协商缓存解决，但是在一些特殊的地方可能需要选择特殊的缓存策略

* 对于某些不需要缓存的资源，可以使用 Cache-control: no-store ，表示该资源不需要缓存
* 对于频繁变动的资源，可以使用 Cache-Control: no-cache 并配合 ETag 使用，表示该资源已被缓存，但是每次都会发送请求询问资源是否更新
* 对于代码文件来说，通常使用 Cache-Control: max-age=31536000 并配合策略缓存使用，然后对文件进行指纹处理，一旦文件名变动就会立刻下载新的文件
  
## 工程化

### Webpack

### Babel

Babel 是一个 JavaScript 编译器。他把最新版的 javascript 编译成当下可以执行的版本，简言之，利用 babel 就可以让我们在当前的项目中随意的使用这些新最新的 es6，甚至 es7 的语法。
Babel 的三个主要处理步骤分别是： 解析（parse），转换（transform），生成（generate）。

> * 解析
将代码解析成抽象语法树（AST），每个 js 引擎（比如 Chrome 浏览器中的 V8 引擎）都有自己的 AST 解析器，而 Babel 是通过 Babylon 实现的。在解析过程中有两个阶段：词法分析和语法分析，词法分析阶段把字符串形式的代码转换为令牌（tokens）流，令牌类似于 AST 中节点；而语法分析阶段则会把一个令牌流转换成 AST 的形式，同时这个阶段会把令牌中的信息转换成 AST 的表述结构。
> * 转换
在这个阶段，Babel 接受得到 AST 并通过 babel-traverse 对其进行深度优先遍历，在此过程中对节点进行添加、更新及移除操作。这部分也是 Babel 插件介入工作的部分。
> * 生成
将经过转换的 AST 通过 babel-generator 再转换成 js 代码，过程就是深度优先遍历整个 AST，然后构建可以表示转换后代码的字符串。

还想深入了解的可以看 [Babel 原理](https://juejin.cn/post/6844903760603398151)

## 其他

### 三、TS

掘金1.8w字文档 <https://juejin.cn/post/6872111128135073806>
