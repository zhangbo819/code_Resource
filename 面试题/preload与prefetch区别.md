# 预加载属性 preload 与 prefetch 区别

## preload 与 prefetch 区别

1. preload 告诉浏览器立即加载资源;
2. prefetch 告诉浏览器在空闲时才开始加载资源；
3. preload、prefetch 仅仅是加载资源，并不会“执行”;
4. preload、prefetch 均能设置、命中缓存；
5. 正确使用 preload、prefetch 不会导致重复请求；

## 优先级

1. preload 优先级高于 prefetch；
2. 使用 preload 会将资源优先级设置为 Highest，而使用 prefetch 会将资源优先级设置为 Lowest，Lowest 资源将会在网络空闲时才开始加载。

## 缓存

1. 在资源有设置缓存的情况下，通过 preload 与 prefetch 加载资源缓存均能生效；

## 重复请求

1. 当页面中实际用到的资源与 preload、prefetch 加载的资源重复时，浏览器不会进行重复请求（这个例子中不会出现第三个 main.js 的请求）；
2. 但是相同的资源重复使用 preload、prefetch 属性时将会导致重复下载（main.js 请求了两次，第二次耗时 6s 的请求为 prefetch 发起的）；

## 参考链接

[外链 - 预加载属性 preload 与 prefetch 区别](https://juejin.cn/post/7067189922506997773)