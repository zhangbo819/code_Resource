# Vue 2.6源码学习心得

从Vue源码中移植，便于学习

- [主学习文件](./study.html)
- [基本工具函数]()
- [配置/全局b变量]()
- [Observer](./Observer.js)
- [Dep](./Dep.js)
- [Watcher](./Watcher.js)
- [VNode]()
- [patch]()


## 整体感想


处理数据，数据变的时候 执行回调 更新视图

```

new Vue() -> Observer -> 多个 defineReactive$$1 -> 多个 Dep -> get depend -> addDep -> 放置回调
                                                           -> set notify -> update -> 执行回调
```


根据dom 生成多个 Watcher， Watcher中注册好更新视图的回调, 触发Dep的get 放置好回调

```

Compile -> _render -> 触发模板中所有的属性的getter，将 Watcher 存入 Dep, 生成VNode，完成依赖收集

```


一个Vue对象，他的data对应一个Observer对象，Observer会遍历再通过defineReactive$$1，每条属性都注册一个Dep，如果还有子属性递归地为所有子元素注册Dep
(并且设置setter/getter, getter放置回调, setter执行回调)

### ?? Watcher如何保障同一个key不重复保存

全局有无数个Dep实例，所有的Dep实例受Dep类下的target来控制注册，不管哪个Dep实例depend了，只有target下的才会去放置回调，
target是一个Watcher实例，target由pushTarget方法设置，pushTarget在Watcher实例执行get方法的时候会将自己设置为Dep.target, 触发getting方法，然后在将Dep.target移除，一个Watcher下有多个Dep

### Dep 和 Watcher 的关系

> Dep和响应式数据一一对应，一条响应式数据对应一个 Dep
> 一个Dep可对应多个Watcher，表现为一条数据修改 触发多个 Watcher 回调函数执行
>> 例子：两个 computed 都依赖了同一条属性，当这个属性更新时，会触发这两个 computed 的 Watcher 进行更新
    
>> 两个 computed 在 initState 的 initComputed 的 createComputedGetter 时，将属性绑定到 vm 实例上
>> 在首次挂载，生成 VNode 节点时，触发 getter，随即触发 Watcher 下的 evaluate 进而触发 this.get, get中会将自己存在对应的Dep中，两个Watcher如果触发的是同一个属性，就会存入同一个 Dep
<!-- >> 当属性修改时，会执行 Dep 下 的 notify，将保存在 subs 中的 Wachter 实例全部 update, 进而通知 -->

> 一个 Watcher 对应多个Dep, 表现为一个 Watcher 回调函数触发，会造成多条数据进行更新
>> 例子：在一个 Watcher 函数中，修改了多条数据

>> 首先 initState -> initWatch -> $watch, 然后new 一个 Watcher 初始化(配置不是lazy)时候, 会执行this.get
>> this.get 中 将自己存入 Dep.taget, 然后再执行回调函数，回调函数中调用了多条属性，于是那些属性的 Dep，就都存入了当前这个 Watcher
<!-- >> this.get 会将自己设置为 Dep.target，然后触发 getter函数，这样就会触发 getter函数中的 Dep
>> getter -> dep.depend -> Dep.target.addDep(Watcher.addDep) -> Watcher 存下来 Dep, Dep也存下了 Watcher
>> this.get 执行的最后会执行 cleanupDeps， 用this.deps替换newDeps / this.depIds 替换 newDepIds, 并清空 newDeps 和 newDepIds  -->


### Computed 原理

> 1. 本质是一个 lazy 的Watcher，在 new Vue -> initState -> initComputed 中处理该组件下所有Computed -> 每个 key 对应一个 Watcher 实例
> 
> 2. 通过 Watcher的 this.get 来实现数据的响应式，在 this.get 中会执行用户写的 getter 函数，如果里面依赖了其他数据，会将自己的 Watcher 添加到被依赖数据的Dep中，那样被依赖数据更新时，因为是 lazy 模式会将这个 Watcher 的 dirty 置为 true, 在真正用到这个属性的时候再执行 this.get
> 
> 3. 通过defineProperty手动绑定key至vm，仅在get函数做了三件事
>> 1. 如果有 Dep.target 执行 watcher.depend。是一个 Computed 能够依赖其他响应式数据甚至是另一个 Computed 的关键。如果在触发当前这个 Computed 的 getter 时, 发现有 Dep.target（Dep.target是一个Watcher，仅在Watcher实例执行this.get时会被添加），说明一定有其他 Watcher 的 this.get 被触发，也就是说，正在被触发的数据用到了当前这个Computed，则当前这个 Computed 会被添加到被触发数据的 Dep 中
>> 2. evaluate。Watcher里 lazy 实现的关键，因为是 lazy 模式，所以在 Watcher 初始化时并不会触发this.get，而在 update 中也是将 dirty 置为true, 在真正用到这个属性时再通过evaluate，触发this.get，执行用户写的触发函数
>> 3. 返回 watcher.value。如果没有检测到 dirty 即没有更新，则不用触发get，直接返回 Watcher 对象中缓存的上次的 value 值


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

    ```js
    // initGlobalAPI:

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


### 2. 初始化根Vue实例

1. new Vue, 携带参数构建Vue实例， 执行_init, 合并处理参数

2. uid, 性能监控相关, _isVue, 有没有_isComponent, 有的话 initInternalComponent， 部分值重新赋值, 没有的话 mergeOptions, 将传入的不完全的option 转换成完全的option
   
   ```js

    // 没有的话 mergeOptions
    // 规范化parent和child并把他俩合到（同一个属性以child的准）一个新对象上return

    function mergeOptions(
        parent,
        child,
        vm
    ) {
        // ...

        normalizeProps(child, vm); // 处理props，根组件一般没有
        normalizeInject(child, vm); // 处理inject，根组件一般没有
        normalizeDirectives(child); // 处理directives

        // 处理 extends 和 mixins
        if (!child._base) {
            if (child.extends) {
                parent = mergeOptions(parent, child.extends, vm);
            }
            if (child.mixins) {
                for (var i = 0, l = child.mixins.length; i < l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm);
                }
            }
        }

        // 将parent和child合并，生成新的options
        var options = {};
        var key;
        // 先看parent
        // component, directive, filter 合并到一个对象
        // 多个生命周期存到一个数组中
        for (key in parent) {
            mergeField(key);
        }
        // 其他如 el, router, store父组件没有的或是自定义的，直接用
        for (key in child) {
            if (!hasOwn(parent, key)) {
                mergeField(key);
            }
        }
        function mergeField(key) {
            var strat = strats[key] || defaultStrat;
            options[key] = strat(parent[key], child[key], vm, key);
        }
        return options
    }

   ```

3. 执行主体函数

    ```js

    initLifecycle(vm); // 为Vue实例赋值空一些变量
    initEvents(vm); // 赋值空的事件
    initRender(vm);  // 赋值空的插槽VNode，赋值构建函数，手动执行 $attrs和$listeners的 defineReactive
    callHook(vm, 'beforeCreate'); // beforeCreate 包含插件的beforeCreate，如vue-router， 在这里进行大量的配置及初始化
    initInjections(vm); // resolve injections before data/props
    initState(vm);  // 初始化props, methods, data, computed, watch
    initProvide(vm); // 有provide的话，执行
    callHook(vm, 'created'); // created

    ```
4. 最终挂载 vm.$mount， 有el属性会直接执行 vm.$mount，没有的话仅为注册，等待触发，[子组件如何挂载](#6-子组件如何挂载)


### 3. 初始化渲染

1. $mount -> compileToFunctions 生成构建器 -> mountComponent 组件挂载 
2. mountComponent -> new Watcher -> 执行get -> 初始化：直接执行 this.getter.call(vm, vm) / watcher.before
                                           <!-- -> 将自己放到有Dep -> 更新： Watcher.update -> queueWatcher -> flushSchedulerQueue -> watcher.before() -->
3. watcher.before() -> updateComponent() -> vm._render 生成vnode（生成Vnode的过程中会触发Observer下的对应属性的Dep的getter,完成依赖收集，将watcher） -> vm._update 更新
   
   ```js

    callHook(vm, 'beforeMount');

    // 生成 updateComponent
    updateComponent = function () {
        var vnode = vm._render();
        vm._update(vnode, hydrating);
    }

    new Watcher(vm, updateComponent, noop, {
      before: function before() {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook(vm, 'beforeUpdate');
        }
      }
    }, true /* isRenderWatcher */);

    hydrating = false;

    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }
    return vm

   ```
4. vm._update -> vm.\_\_patch\_\_() -> createElm -> 移除 -> invokeInsertHook


### 4. 属性更新

1. 在属性第一次在render函数中执行的时候，就会触发该属性getter函数，同时将组件的watcher实例放入该属性的Dep实例中
2. 在属性重新赋值后会触发setter函数，Dep实例执行notify，执行跟他关联的所有watcher实例的update方法，把自己放入queueWatcher队列开始启动
3. queueWatcher -> nextTick -> timerFunc -> flushCallbacks -> flushSchedulerQueue -> 先执行before，再执行run
4. 执行before, 调用生命周期更新方法, 执行run，会先执行this.get, 会执行初始化时传入的expOrFn函数，即执行vm._update(vm._render(), hydrating);
5. render函数是一样的，生成的VNode是不同的，在进行update会将新旧VNode进行patch
6. patch后就完成了属性更新，patch会对比新旧VNode，并从中选出最优的更新策略，进行DOM更新


### 5. queueWatcher异步队列 (属性更新中的第三步详解) 

1. 判断flushing，没有处于刷新队列状态，直接入列，如果处于则按照顺序将自己的watcher.id插入 (flushing代表queue队列已经开始执行了)
2. 异步队列直接走 nextTick(flushSchedulerQueue)
3. nextTick将 flushSchedulerQueue 包装成一个新的函数，放入callbacks中，如果没有pedding，则执行timerFunc
4. timerFunc会根据代码执行环境，选用Promise, MutationObserver, setImmediate, setTimeout 来执行 flushCallbacks
5. pedding保障了 在timerFunc真正执行的期间push进callbacks的回调函数统一执行
6. flushCallbacks 执行时会将pending设为false, 从callbacks中拿出，并将其清空, 然后执行从callbacks里保存的函数，即 flushSchedulerQueue
7. flushSchedulerQueue 将queue挨个执行，执行后清空queue, 执行过程中先执行watcher.before, 在执行watcher.run


### 6. 子组件如何挂载


### keep-alive原理

## patch

### 1. 注册__patch__函数

> 1. __patch__ -> createPatchFunction({ nodeOps: nodeOps, modules: modules })
> 2. nodeOps 各种 DOM 操作方法集合
> 3. modules 各种更新 标签上的属性 的方法集合 ??


### 2. 处理参数/注册各种工具函数

> 1. 创建 cbs 对象，以 hook 数组的顺序 ['create', 'activate', 'update', 'remove', 'destroy'], 赋值给 cbs 的key，值为空数组
> 2. 将 modlues 里各个模块的 各个生命周期存入 cbs 对象对应的 key 中


### 3. return 新函数 patch

> 1. patch 接受4个参数
> ```js
> // oldVnode, vnode 新旧节点
> // hydrating ??
> // removeOnly ??
> return function patch(oldVnode, vnode, hydrating, removeOnly) {}
> ```
> 2. 判断如果新节点为空，旧节点存在，则为销毁，执行invokeDestroyHook方法
> ```js
> function invokeDestroyHook(vnode) {
>     var i, j;
>     var data = vnode.data;
>     if (isDef(data)) {
>        // 执行 destroy 方法
>        if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
>        // 执行所有的 cbs.destroy, (仅有 ref 和 directives)
>        for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
>      }
>      // 递归调用 children
>      if (isDef(i = vnode.children)) {
>          for (j = 0; j < vnode.children.length; ++j) {
>            invokeDestroyHook(vnode.children[j]);
>          }
>        }
>      }
> ```
> 2. 判断如果旧节点为空，则为新建，createElm(vnode, insertedVnodeQueue);
> 3. 新旧都有，先比较新旧 VNode， 旧VNode不为真实存在，且是否为同一个，则更新VNode patchVnode
> 4. 不是则 ？？