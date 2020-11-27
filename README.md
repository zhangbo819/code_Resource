# code_Resource 前端学习资料 (持续更新中)

## 目录

<!-- - [手册](https://github.com/zhangbo819/code_Resource/tree/master/FE-Interview-Questions-master)
- [Git](https://github.com/zhangbo819/code_Resource/tree/master/Git)
- [Node](https://github.com/zhangbo819/code_Resource/tree/master/Node)
- [小工具](https://github.com/zhangbo819/code_Resource/tree/master/widget) -->

[index](https://zhangbo819.github.io/code_Resource/)
[.gitignore语法](https://www.jianshu.com/p/ea6341224e89)
todo

<!-- # 前端知识 -->

## CSS

### 文本超出就隐藏并且显示省略号

```css

.class {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; // 作为弹性伸缩盒子模型显示。
  -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
  -webkit-line-clamp: 2; // 显示的行
}
```

#### Sass

- :not(.class) 可以为一个类，在不包含某个类时设置样式属性，比如更改el组件颜色后，设置成不包含禁用的，非常方便，但需要注意设置后权值会提升

### 三角

主体思路利用边框的三角形，将三边设为透明，即为4分之一正方形、尖和坐标轴垂直的三角形，将连续的两边设为透明，其余使用颜色，即为半个正方形

```css

.class {
  border: 12px solid transparent;
  border-top-color: $colorBtn;
  border-right-color: $colorBtn;
}
```

## JS

### Canvas

- Canvas可以转成base64，再以文件的形式在接口中上传

### js | 0 取整

```js
console.log(10/3 | 0) // 0.3
```

## React源码学习

### 概览

核心

1. Jsx到普通js的转换 babel
2. React.createElement
3. 各个react核心中的api，空壳
4. api concurrent-mode 手动设置高优先级更新方式，以此达到卡顿时调度效果
5. api suspense和lazy渲染异步组件

一. React 创建更新 （调度）

1. React-dom render 大致流程 (创建ReactRoot -> 创建fiberRoot和rootFiber -> 创建更新） ReactDOM.render -> legacyRenderSubtreeIntoContainer -> legacyCreateRootFromDOMContainer -> hydrate, 判断是否需要调和子节点 -> return new ReactRoot -> DOMRenderer.createContainer (reconciler) -> createFiberRoot -> updateContainer -> 计算expirationTime -> 调用updateaContainerAtExpirationTime -> scheduleRootUpdate标记要更新的地点 设置更新属性 -> enqueueUpdate -> scheduleWork 开始调度进行更新
2. todo

二.更新调度（决定需要更新什么组件）（协调）
使用双缓存机制在内存中构建中新树workInProgress fiber, 最终交给渲染器渲染。
构建新树的过程：

1. 从根节点rootFiber开始向下深度优先遍历
2. 根据节点中的属性（新的props），和原节点（diff算法），生成新的fiber节点
3. 逐步遍历每个子节点（beginWork），没有子节点后向上层回归并寻找兄弟节点(completeWork)，重复这个过程直到完成整个fiber树的遍历
4. 在completeWork的上层会根据effectTag，生成一个effectList链，供commit阶段使用

三.将需要更新的组件进行渲染（渲染）
处理单链表effectList，生命周期，hook

1. Before mutation 执行dom操作前
2. Mutation 执行dom操作
3. Layout 执行dom操作后

### Fiber

是react最小的单元结构，用于保存节点信息和行为，为了解决react 15及以前更新视图时无法中断，导致在页面元素很多，且需要频繁刷新的场景下会出现掉帧的情况，针对这个问题react重写了Reconciler层，引入fiber来实现调度，是将原来一个整体的任务分成多个小块，每个小块完成后都会将控制权交给浏览器，然后再根据当前任务的优先级来判断先执行优先级较高的任务，丢弃掉优先级不高的任务，在合适时再执行，所以react有些生命周期会变得不稳定，因为在暂停并继续的过程中部分生命周期的方法可能会执行多次

## React生态库

### Ant design pro

使用 umi 作为开发框架 = dva + antd design

### AntV 系列

#### 调研

- G2 可视化引擎 数据驱动，高度易用，可扩展的可视化图形语法，类似于echarts
- G6 图可视化引擎 便捷的关系数据可视化引擎与图分析工具，可以实现各种流程图脑图等
- F2 移动可视化方案 专注于移动端的可视化解决方案，兼容 H5/小程序/Weex 等多端环境，移动端可视化
- l7 高性能/高渲染质量的地理空间数据可视化框架，主要在地图方面
- bizcharts 基于商业场景下的数据可视化解决方案，基于G6封装的图分析英语

## ReactNative

### 遇到的坑

在测试安卓时，发现一个在新版本RN的安卓上获取 measure undefined问题

正常是通过measure来获取元素的真实位置，但是在新版本中measure获取的位置全是undefined，在网上查了之后发现，这个是新版本RN在安卓上的一个优化，会让布局其子级或不绘制任何内容的视图，在被原生组件渲染时被移除，而我这个元素正好是自己没有任何的样式，这块解决是，在符合条件的View上主动去设置collapsable: false这个属性来关闭这个优化，没有全局替换的原因是这个属性会对页面进行优化，所以需要保留，仅在需要时设置即可

## Vue

### 基础语法

#### 插槽 slot

类似于react的this.props.children

```vue

父组件 <slot name=‘aaa’ />
子组件
<Comp>
	<template v-slot:default />
        <template v-slot:aaa />
</Comp>
```

#### 作用域插槽

父组件中指定上下文对象, 子组件中绑定变量, 进行使用

#### vue组件通信

父子 props, ref
子父 this.$emit
兄弟 this.$parent.$on, this.$parent.$emit
多层传递 provide, inject
任意两个组件之间 创建一个单独的数据管理者 事件总线和vuex

#### 双向绑定 v-model和.sync

都是语法糖, v-model固定是value和input, 而.sync则可以自定义其他的名称

#### Vue class动态表达式

```vue

:class="{'span-value': true, 'pay': j === item.list.length - 1 }"

// 或者

:class="['span-value', j === item.list.length - 1 && 'pay' ]"
```

#### v-model理解

V-model是一个语法糖，vue本质和react一样是单向数据流,

下面两句的意思相等

```vue
<currency-input v-model="price"></currentcy-input>
<currency-input :value="price" @input="price = $event.target.value"></currency-input>
```

相当于定义了一个value的props，和接受一个名为input的事件，在子组件中只要接受value的props，并在改变时调用类型为input的emit通知，就可以在父组件中使用v-model来管理相应状态

### vue项目缓存未生效问题

[vue项目缓存未生效问题链接](https://www.cnblogs.com/qiu-Ann/p/11394504.html)

### 本地调试一直报错 Invalid Host/Origin header 问题

- 需要在 vue.config.js 中加入 disableHostCheck: true
- 或者添加真实主机 host: "scrm.chengjiukehu.com"

## Vue生态库

### vue-router

全局 beforeEach(to, from, next)
个别 beforEnter(to, from, next)
可以进行路由守卫, 事件埋点等

### Element-ui

- element-ui抽屉组件一出来的时候会默认选中一个元素，影响美观，是因为el里的元素设置了一个tabindex，可以将为0的tabindex设置给别的元素再将其隐藏，就解决了默认选中的问题

### Vue-element-admin

[Vue-element-admin文档](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E9%85%8D%E7%BD%AE%E9%A1%B9)

### Vant

Vant在pc端不支持滚动事件，在引入了官方提供的@vant/touch-emulator后就可以了，他是将移动端的mouse转换成对应的touch事件

## Npm

### Cross-env

运行跨平台设置和使用环境变量的脚本，Windows命令行中在使用NODE_ENV = production设置环境变量时会报错，使用cross-env可以设置在不同的平台上有相同的NODE_ENV参数。

### Npm script

- Npm script 的脚本可以通过 两个- 将参数传到另一个npm script中

## Git

### 一键合并上传

```git

git checkout dev && git merge --no-edit - && git push && git checkout - && git push

git merge -m ‘合并信息’
```

## IOS

### CocoaPods

安装进度条一直不动，需要换源

```sh

gem sources --remove https://rubygems.org/
gem sources -a https://gems.ruby-china.com
```

然后再装就可以了

## 浏览器调试

### console背景色和字体

``` js

console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
```

%c, 样式出现位置的占位符, 支持各种css样式

[创造性的使用Console 链接](https://juejin.im/post/5caff3035188251b027ed9c4)

## 服务端知识

### 了解JWT

[阮一峰老师 JWT 文章](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

- JWT由三部分组成，header、payload、signature，彼此之间用.来连接，所以最终格式就是header.payload.signature,
- Header和payload都是一个json对象，header是描述JWT的元数据，通常包含签名算法的类型，和这个令牌的类型，一般固定用JWT，
- Payload是实际存放数据的地方，官方规定了7个字段名及含义，也可以使用自定义字段
- signature部分是对前两部分的签名，防止数据篡改。该签名是根据秘钥生成的，而秘钥只在服务器中不传给他人，别人在没有秘钥的情况下篡改了数据后，无法生成合法的signature，从而不被服务器接受
