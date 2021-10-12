<!-- (https://github.com/poetries/FE-Interview-Questions/)[https://github.com/poetries/FE-Interview-Questions/] -->

# 大纲

## 基础知识

* JS基础
* es6
* css基础
* 网络基础 http、dns、tcp、cdn、缓存

## 工程化

* webpack
* Babel
* 前端安全
* 性能优化
* 部署发布

## 框架/源码

* Vue、React 工作机制、各自特点
* Diff
* Mvvm

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

### 一、Js基础

#### 作用域

程序中定义变量的区域，他绝对了当前执行代码对变量的访问权限

<https://juejin.cn/post/6844904165672484871>

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

### 四、CSS

#### flex布局

<https://juejin.cn/post/6881565341856563213>

### 五、http

http详解  <https://juejin.cn/post/6844904045572800525>

基础知识 <https://juejin.cn/post/6844904087524229133>

#### 缓存

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
  
## 其他

### 三、TS

掘金1.8w字文档 <https://juejin.cn/post/6872111128135073806>
