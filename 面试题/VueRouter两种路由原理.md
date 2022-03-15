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

### history模式需要后端进行配置, 文件或者文件夹都不存在时定位到index.html

[外链 - Vue Router history模式的配置方法及其原理](https://juejin.cn/post/6844903856359342087)

```nginx

location / {
  try_files $uri $uri/ /index.html;
}


```

### history模式下可能会遇到的问题及解决方案

- 在将我的项目（在路由中用了懒加载）改为history模式的过程中，有时候发现会出现chunk加载出错的情况，打开chrome的network发现那个chunk加载404了，是因为请求的url中多了一层路径。我在这里发现了解决方案。

- LinusBorg说，因为在history模式中切换路由时，我们是真正改变了页面的url路径，所以webpack的runtime会认为它位于example.com/some/path。如果publicPath是设置的相对路径，那么webpack加载chunk时可能会变成example.com/some/path/static/js/3.js这样的路径，然而chunk的真正路径是example.com/static/js/3.js，所以我们需要将publicPath设置为绝对路径（publicPath: '/'）来解决这个问题。
