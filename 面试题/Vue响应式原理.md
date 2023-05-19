<!-- Vue2 -->

# Vue 响应式原理

## Vue2

一句话总结:

vue.js 采用数据劫持结合发布-订阅模式, 通过 Object.defineproperty 来劫持各个属性的 setter,getter, 在数据变动时发布消息给订阅者, 触发响应的监听回调

# 核心实现类

- Observer : 它的作用是给对象的属性添加 getter 和 setter，用于依赖收集和派发更新
- Dep : 用于收集当前响应式对象的依赖关系,每个响应式对象包括子对象都拥有一个 Dep 实例（里面 subs 是 Watcher 实例数组）,当数据有变更时,会通过 dep.notify()通知各个 watcher。
- Watcher : 观察者对象 , 实例分为渲染 watcher (render watcher),计算属性 watcher (computed watcher),侦听器 watcher（user watcher）三种

<!-- TODO -->

## Vue3

Vue3 采用 Proxy 的方式监听，能直接代理整个对象, 对这个对象新增新的属性也会被监听到
> 但对于对象套对象这种深层次的结构 依然需要递归遍历

```js
const data = new Proxy({ a: 1, obj: { key1: 1 } }, {
    set(target, key, value, receiver) {
        console.log('target, key, value, receiver', target, key, value, receiver) 
        Reflect.set(target, key, value, receiver)
    }
})
```