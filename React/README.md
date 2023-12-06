# React

<!-- ## 类组件生命周期

### React v16.0 之前的生命周期

### React V16.0 之后的生命周期 -->

- 源码
  - Fiber
  - Scheduler
- React 各版本差异
  - 18
    - Concurrent mode 并发模式
    - 更新 render API
    - 自动批处理
    - Suspense 支持 SSR
    - startTransition
    - useTransition
    - useDeferredValue
    - useId
    - 提供给第三方库的 Hook
      - useSyncExternalStore
      - useInsertionEffect
  - 17
    - 无新特性
    - 去除事件池
    - 事件委托到根节点
    - 更贴近原生浏览器事件
    - 全新的 JSX 转换器
    - 副作用清理时机
    - 返回一致的 undefined 错误
    - 原生组件栈
    - 移除私有导出 API
    - 启发式更新算法更新
  - 16
    - Fiber
    - Hook
    - Context
    - Portal
    - Fragment
  - 16 前
- 生态库
  - Redux
  - Recoil
  - immutable
- SSR
  - Next.js

## Fiber

### 简版

- 为解决 React 遍历树过程由于无法打断导致的页面卡顿问题，而定义的新的数据结构
- 单链表结构，由 return、children、siblings 等组成，便于在中断后重新找回当前节点
- 更新时间超过 1 帧时就会产生视觉卡顿，因此通过 fiber 把浏览器渲染过程分段执行，每执行一会就让出主线程控制权（requestIdleCallback），执行优先级更高的任务
  - requestIdleCallback 这个 API 只负责低优先的级的任务处理，而高优先级的（比如动画相关）则通过 requestAnimationFrame 来控制 。
- 更新机制为双缓冲模式，current 当前视图层的树，workInProgress 正在内存中构建的树
- 更新过程 JSX -> render function -> VDOM -> fiber
- Effect list，用于保存组件更新过程中触发的副作用，也是一个单链表，是在 fiber 遍历过程中进行收集产生的
<!-- - VDOM 到 fiber 的过程为 reconcile， -->

### Fiber 执行流程

<img src="https://pic2.zhimg.com/80/v2-9fcf2cfa698301ce7bc78bc3857904ed_720w.webp">

Fiber 总的来说可以分成两个部分，一个是调和过程（可中断），一个是提交过程（不可中断）。

在调和过程中以 fiber tree 为基础，把每个 fiber 作为一个工作单元，自顶向下逐节点构造 workInProgress tree（构建中的新 fiber tree ）

<img src="https://pic3.zhimg.com/80/v2-8c3b88ee7471ba1303c4460967da36fa_720w.webp">

### 时间切片和可中断渲染具体实现

[时间切片和可中断渲染具体实现](https://juejin.cn/post/7258881840823844920#heading-24)

## React 各版本差异

### 17 18

[一文解读 React 17 与 React 18 的更新变化](https://juejin.cn/post/7157888552229928996?searchId=202312061521091477F4EA185EBE786FCD)

## 参考链接

[一文带你梳理 React 面试题（2023 年版本）](https://juejin.cn/post/7182382408807743548)
[React 面试题: 不一定最全但绝对值得收藏！！(1 ~ 10) (万字总结)](https://juejin.cn/post/7258071726227849277)
[「React Fiber」 详细解析](https://zhuanlan.zhihu.com/p/424967867)
[某大厂一面: 讲讲 Fiber 架构以及它是如何实现增量渲染的](https://juejin.cn/post/7258881840823844920#heading-0)
