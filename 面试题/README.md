# 面试题整理

[toc]

## CSS 隐藏元素的八种方法

[外链 - CSS 隐藏元素的八种方法](https://juejin.cn/post/6844903456545701901)

### 说下 flex: 1

[内链 - flex: 1](./flex:1.md)

### position 属性都是相对于什么来定位

- static：首先 position 属性的默认值是 static，static 没有定位，元素出现在正常的流中，会默认忽略 top、bottom、left、right。与脱离文档流的元素一起 z-index 会失效

- relative：其次 relative 也未脱离文档流，relative 生成相对定位的元素，相对于**自身的正常位置**做定位，因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。相当于元素往右偏移20个元素；

- absolute: 绝对定位，absolute 相对于**除去 static 定位以外的第一个父元素进行定位**

- fixed: 固定定位是相对于浏览器窗口的定位，无论页面的上拉下滑，fixed 定位元素相对于**浏览器窗口**的位置不变，一般用来做弹出窗口或者广告定位。

- inherit: 规定应该从**父元素继承** position 属性的值（任何版本的ie浏览器都不支持该属性）


## 跨域问题

[内链 - 跨域问题](./跨域问题.md)

## 说下 http状态码

[内链 - http状态码](./http状态码.md)
## 从输入网址到内容返回解析的全过程

### 简版

1. DNS解析，多次查询找到ip地址 （可缓存、DNS负载均衡、CDN）
2. TCP连接 （三次握手）
3. 发送HTTP请求
4. 服务器处理请求并返回HTTP报文
5. 浏览器解析渲染页面
6. 连接结束

### 详版

[内链 - 从输入网址到页面解析的全过程](./从输入网址到页面解析的全过程.md)

## 继承

[内链 - 继承](./继承.md)

## 箭头函数和普通函数的区别

[内链 - 箭头函数和普通函数的区别](./箭头函数和普通函数的区别.md)

## ES6的Map和普通对象区别

1. key的类型无限制
2. Map的key有顺序，普通对象的key不一定，看浏览器
3. Map有自己的api，set，get，includes，clear，delete

## offsetWidth、offsetLeft、clientWidth和scrollWidth

[内链 - clientWidth和offset](./clientWidth和offset.md)

## js事件循环

[内链 - js事件循环](./JS事件循环.md)

## vue-router 两种路由原理

[内链 - VueRouter两种路由原理](./VueRouter两种路由原理.md)

## vue中props和$attrs区别

1. props 需要先声明才能获取值，而 attrs 则不用
2. props 声明过的属性，attrs 里面不会在出现
3. props 不包含事件，attrs 包含
4. props 支持 string 以外的类型，而 attrs 只有 string 类型

## 性能优化

[内链 - 性能优化](./性能优化.md)

## 前端安全性

[内链 - 前端安全性](./前端安全性.md)

## 面试真题

[内链 - 面试真题](./README_真题.md)

## 文章

- [揭秘前端路由本质](https://mp.weixin.qq.com/s?__biz=MzI3NTM5NDgzOA==&mid=2247485173&idx=1&sn=0eb7739aaf8e456d1b7a58dd353107ef&chksm=eb043e8cdc73b79a16f3982662041aed684b63198d772d3b6a47b5a89816e524e09dd8d92781&cur_album_id=1692321392169402371&scene=190#11111)
- [axios、vuex、redux、koa，中间件实现原理](https://mp.weixin.qq.com/s/jKSVAHIhSnL49tzguIdZkQ)
- [FE-Interview-Questions](https://github.com/poetries/FE-Interview-Questions/)