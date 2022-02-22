# VueRouter两种路由原理

[外链 - 手写Vue-router核心原理，再也不怕面试官问我Vue-router原理](https://juejin.cn/post/6854573222231605256#heading-6)

在 Web 前端单页应用 SPA(Single Page Application)中，路由描述的是 URL 与 UI 之间的映射关系，这种映射是单向的，即 URL 变化引起 UI 更新（无需刷新页面）。

## hash

hash 是 URL 中 hash (#) 及后面的那部分，常用作锚点在页面内进行导航，**改变 URL 中的 hash 部分不会引起页面刷新**

通过 **hashchange** 事件监听 URL 的变化，改变 URL 的方式只有这几种：

1. 通过浏览器前进后退改变 URL
2. 通过```<a>```标签改变 URL
3. 通过window.location改变URL

## history

history 提供了 **pushState** 和 **replaceState** 两个方法，**这两个方法改变 URL 的 path 部分不会引起页面刷新**

history 提供类似 hashchange 事件的 **popstate** 事件，但 popstate 事件有些不同：

1. 通过浏览器前进后退改变 URL 时会触发 popstate 事件
2. 通过pushState/replaceState或```<a>```标签改变 URL 不会触发 popstate 事件。
3. 好在我们可以拦截 pushState/replaceState的调用和```<a>```标签的点击事件来检测 URL 变化
4. 通过js 调用history的back，go，forward方法课触发该事件

所以监听 URL 变化可以实现，只是没有 hashchange 那么方便。
