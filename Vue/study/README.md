# Vue 2.6源码部分拆分

从Vue源码中移植，便于学习


- [基本工具函数]()
- [配置/全局b变量]()
- [Dep](./Dep.js)
- [VNode]()


## 整体感想


处理数据，数据变的时候 执行回调 更新视图

```
new Vue() -> Observer -> 多个 defineReactive$$1 -> 多个 Dep -> get depend -> addDep -> 放置回调
                                                           -> set notify -> update -> 执行回调
```


根据dom 生成多个 Watcher， Watcher中注册好更新视图的回调, 触发Dep的get 放置好回调

```
Compile -> update -> 注册多个 Watcher 的回调 -> 改变Dep.taget -> 触发get/addDep/放置回调
```


一个Vue对象，他的data对应一个Observer对象，Observer会遍历再通过defineReactive$$1，每条属性都注册一个Dep，如果还有子属性递归地为所有子元素注册Dep
(并且设置setter/getter, getter放置回调, setter执行回调)

全局有无数个Dep实例，所有的Dep实例受Dep类下的target来控制注册，不管哪个Dep实例depend了，只有target下的才会去放置回调，
target是一个Watcher实例，target由pushTarget方法设置，pushTarget在Watcher实例执行get方法的时候会将自己设置为Dep.target, 触发getting方法，然后在将Dep.target移除，一个Watcher下有多个Dep

?? Dep和Watcher的关系

> 一个Watcher对应多个Dep, 在Watcher初始化(配置不是lazy)时候, 会执行this.get
> this.get 会将自己设置为Dep.target，然后触发getter函数，这样就会触发 getter函数中的 Dep
    >> getter -> dep.depend -> Dep.target.addDep(Watcher.addDep) -> Watcher 存下来 Dep, Dep也存下了 Watcher

> this.get执行的最后会执行 cleanupDeps， 用this.deps替换newDeps / this.depIds替换newDepIds, 并清空newDeps和newDepIds 

## 断点调试

[原调试文件](./study.html)

### 1. 注册期间

1. 先执行源码部分，注册Vue函数里的海量全局函数、全局属性

   ``` 

   数组方法、生命周期注册、各种参数merge）、nextTick、性能监控函数注册、createElement

   ```

3. 执行主体函数 
   
   ```js

    initMixin(Vue); // 向Vue原型对象添加 this._init
    stateMixin(Vue); // $data, $props, $set, $delete, $watch
    eventsMixin(Vue); // $on, $once, $off, $emit
    lifecycleMixin(Vue); // $update，$forceUpdate，$destroy
    renderMixin(Vue); // installRenderHelpers, $nextTick, _render

   ```
     

4. initGlobalAPI、$isServer、$ssrContext、FunctionalRenderContext、version

    ```
    initGlobalAPI:

    Vue.config
    Vue.util = {
      warn: warn,
      extend: extend,
      mergeOptions: mergeOptions,
      defineReactive: defineReactive$$1
    };
    Vue.set = set;
    Vue.delete = del;
    Vue.nextTick = nextTick;
    Vue.observable = function (obj) {
      observe(obj);
      return obj
    };
    Vue.options

    extend(Vue.options.components, builtInComponents);

    initUse(Vue); // Vue.use
    initMixin$1(Vue); // Vue.mixin (混合option)
    initExtend(Vue); // Vue.extend
    initAssetRegisters(Vue); // component, directive, filter


    ```
5. 生成多个makeMap, Dom处理相关，函数注册 patchVnode
6. css类、过渡的函数注册
7. Vue原型对象方法

   ```js

    Vue.prototype.__patch__ = inBrowser ? patch : noop;

    // public mount method
    Vue.prototype.$mount = function (
        el,
        hydrating
    ) {
        el = el && inBrowser ? query(el) : undefined;
        return mountComponent(this, el, hydrating)
    };

   ```
8.  parseHTML, 各种gen函数， $mount重新包装
9.  Vue.compile = compileToFunctions;


### 2. 执行中

1. new Vue, 携带参数构建Vue实例， 执行_init, 合并处理参数

2. 执行主体函数

    ```js

    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);  // 手动执行了defineReactive
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);  // 处理data 执行 observe
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    ```
3. 最终挂载 vm.$mount