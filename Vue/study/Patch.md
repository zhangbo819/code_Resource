# Vue patch阶段

1. 对比新旧 VNode, 然后增删改
2. 处理 VNode 中 Hook 及其他事件行为
3. 执行相应 DOM 操作

## 1. 注册__patch__函数

> 1. __patch__ -> createPatchFunction({ nodeOps: nodeOps, modules: modules })
> 2. nodeOps 各种 DOM 操作方法集合
> 3. modules 各种更新 标签上的属性 的方法集合 ??


## 2. 处理参数/注册各种工具函数

> 1. 创建 cbs 对象，以 hook 数组的顺序 ['create', 'activate', 'update', 'remove', 'destroy'], 赋值给 cbs 的key，值为空数组
> 2. 将 modlues 里各个模块的 各个生命周期存入 cbs 对象对应的 key 中


## 3. return 新函数 patch

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