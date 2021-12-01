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
4. 最终挂载 vm.$mount ？？


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