# 面试收集的各种真题

## 字节 抖音

Css如何隐藏一个元素
position的各个属性, 各个属性相对于谁进行定位的
flex：1
flex所有属性
实现css宽高比二比一
Clientwidth等都是什么
Vue中怎么判断一个ref
说下依赖收集
Vue3编译优化
给一个标签，使用h函数描述
手写 判断合法的 ‘[]{}()’

## 猎聘一面

Cookie 跨域问题 -> withCredentials设置为true
微前端的优势
箭头函数和普通函数的区别
类数组如何转换为普通数组 1.Array.prototype.slice.call() 2.Array.form 3. […arguments]
节流防抖应用场景
怪异盒模型应用场景

## 猎聘二面

http状态码
http版本号 我们用的什么版本 前端需要注意什么
前端安全性
nginx配置问题
ts、自动化测试
webpack打包速度优化

## boss一面

Cookie, 设置域名

回流 重绘
移动端0.5px
行内元素 padding margin 问题
水平垂直居中几种方式
网格布局

上传原生, in
es5数组去重
Es6的map和普通数组区别, 1. key类型无限制 2.专门的操作 3.map的key有顺序

Vue两种路由
微前端原理、遇到的问题
webpack如何优化

## boss二面

如何检测线上bug -> 检测平台、检测指标, 如何获取到全局报错
页面有若干个图片，检测下载进度
多页面应用，有一个通用的提示条，在一个页面关闭，让其在一段时间内全部页面都不显示，纯前端如何实现
React组件通信
React不可变数据
跨域问题
Cookie怎么配置跨域
前端安全性，XSS，CSRF攻击，是什么如何防止

## 用友一面

如何设计组件
Vue动态路由怎么做 -> addRoutes
继承，组合继承 -> 录入
事件代理是什么及原理 -> 原理是时间冒泡
事件循环机制 -> 
Vue响应式原理 
为什么data是一个函数 -> 避免组件复用引发的引用类型数据污染问题
性能优化 -> 最主要的点Webpack了解，压缩Vue生命周期 -> 8个 创建、挂载、更新、销毁，每个都有before，和完成后


## 逍遥志

Vue和react区别
水平垂直居中
react hook，useMemo和useCallback区别
事件循环
从浏览器输入url到页面解析
webpack优化
防抖

## Cider 一面

移动端适配, rem
积分商城项目搭建问题
flex: 1
css动画 只播放一次 的属性是什么
Margin-top移动到父级是为什么
能说下缓存吗（强缓存、协商缓存）
箭头函数和普通函数的区别
说下原型和原型链，顺便说下原型链终点是什么
Vue.nextTick什么场景用
Vue父子组件从创建到挂载生命周期
Js事件循环

```js
new Promise((resolve) => {
    resolve(3)
    console.log('0')
    Promise.resolve(1).then((i) => console.log(i))
    console.log('2')
}).then(res => {
    console.log(res)
})
// 0 2 1 3
```

手写题 计算可插入最大的花坛数

## 白龙马 一面

原型、原理链
闭包及应用场景
防抖和节流区别 和简单实现
事件循环
判断数据类型的方法
promise 执行顺序
promise.all 及 如果有一个出错 怎么排查
flex:1
Vue 计算属性和watch
Vue响应式原理
Vueloader作用
微前端原理

## 美餐 一面

科里化
flex
怎么取消一个请求, 很多个请求可以只取消固定的几个，或者全部都取消
咋设计一个sdk

## 洛凯云享

手写了一个封装图片懒加载
手写一个查找路径函数
Es处理6兼容性 -> es怎么转成es5
js事件循环，同步异步任务如何处理
node的事件循环，setTimeout和setImmediate
如何检测一个元素进入到了视口中，了解intersection-observer吗
css水平垂直居中
如何设计一个组件库
前端/RN截屏的原理

## 58同城

项目中做了什么前端安全性的提升
项目中做了哪些优化
用过哪些富文本组建
手写题

```js

function _changeData(data = []) {
    const res = [];
    const map = {};

    data.forEach((item) => {
    map[item.id] = item;
    if (item.parent in map) { 
        const target = map[item.parent];
        target.children || (target.children = []);

        target.children.push(item);
    } else {
        res.push(item);
    }
    });

    return res;
}

console.log(
    this._changeData([
        { id: 1 },
        { id: 2, parent: 1 },
        { id: 3, parent: 2 },
        { id: 4, parent: 1 },
        { id: 5, parent: 2 },
        { id: 6, parent: 1 },
        { id: 7, parent: 6 },
    ])
);

```

## 源码资本 一面

ES6 新特性, 每个都能展开来说
vue如果不加key会有什么影响
vue计算属性原理
深拷贝
原型链指向问题，深拷贝中怎么拷贝实例，要求带原型

## 得到

语义化标签，seo方案
bfc
sass/less如何设置一个函数
移动端整个项目的适配方案
像素密度
了解node中间件吗
如果我们的接口可以通过浏览器直接访问，会有什么问题，怎么解决
有一个上传文件的功能，前端需要考虑哪些安全性问题, 如果里面包含一些恶意代码，除了转义外如何处理
平时做移动端项目遇到什么问题，怎么解决

## 派网

一键切换黑夜模式原理
webpack优化点
webpack懒加载配置
Css分包如何做
如何通过规范减少项目中错误

## 掌阅1面

移动端常见兼容性问题
webpack常用loader
热更新机制原理
怎么优化一个h5页面
前端错误捕获sdk原理
微前端常见问题

## 最右

vue和react区别
element-ui的form、formitem工作原理
实现父子自适应三列布局，宽高比1比2

## 红松

es6 import和require
事件循环标记过程
mixins 父子覆盖机制

## 场景视频 1面

项目做了哪些优化
mixins用法
事件循环手写题

```js
async function async1() {
    console.log('as 1')
    await async2()
    console.log('as 2')
}
function async2() {
    console.log('as 2 in')
}
console.log('wai 1')
async1()
console.log('wai 2')
setTimeout(() => {
    console.log('setTimeout in')
})
new Promise(r => {
    r(1)
}).then(res => console.log('p', res))
console.log('wai 3')

```

## 神策 1面

什么情况下会内存泄漏
浏览器存储方式，localStorage失效时间、怎么判断大小
git规范
Babel各个模块都是干什么的
进程、线程
栈、堆的区别与联系
浏览器线程都有哪些
node是单线程的吗

## 美餐 2面

手写题 字符串转数字
跨域问题，cors 设置，option预检返回什么
强缓存、协商缓存
http 2 新增了什么
输入url到页面显示
如何让css提前加载，prefetch和preload

```js

// 题目：
// 写一个方法，把字符串转为数字，比如 str="1234"，变成 int 1234。并且测试这个程序。

function fn (str = '') {
  if (isNaN(str)) return ''
  
  let flag = false
  if (str[0] === '-') {
    str = str.slice(1)
    flag = true
  }
  let res = 0, index = 0
  for (let i = str.length - 1; i >= 0; i--) {
      res += str[i] * Math.pow(10, index++)
  }
  if (flag) {
    res = 0 - res
  }
  return res
}

console.log(fn('11999999999999999999999999999999999999978'))
console.log(fn('-12'))
console.log(fn('+12'))
console.log(fn('x001'))
'1.2e+40'
'00n'
'+100'

```

## 广联达

Css盒模型
说下Js继承
说下js事件循环
垃圾回收机制
项目遇到的问题
在上家公司最大的成长是什么
近期又在关注什么技术

## 掌阅 2面

遇到哪些移动端适配问题
移动端做过哪些性能优化
decodeURI与decodeURIComponent区别
vue路由懒加载原理，文件会什么时候进行加载
Js-bridge如何双向通信，有哪些安全隐患，如何避免？域名白名单
vue-Router, history模式 nginx 如何配置
v-html有什么安全隐患？1.script 2. img src 3. Style, 4 绑定事件

## Authing

1. 物理像素、实际像素
2. 微前端遇到哪些坑
3. Vue的key有什么用，为什么有时候我们不写也没问题，以及什么情况下不写会出问题
4. Vue3数组类型响应式原理，比Vue2的一些优化
5. Vue3的组合式api 比Vue2的option形式好在哪
6. 能说下Vue页面渲染到更新的一个过程
7. webpack原理
8. webpack、rollup，vite差别、各自优缺点
9. 项目里做的比较好的点
