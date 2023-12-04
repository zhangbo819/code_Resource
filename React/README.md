# React

<!-- ## 类组件生命周期

### React v16.0 之前的生命周期

### React V16.0 之后的生命周期 -->

- 源码
  - Fiber
  - Scheduler
- React 各版本差异
  - 18
  - 17
  - 16
    - Fiber
    - Portal
  - 16 前
- 生态库
  - Redux
  - Recoil
  - immutable
- SSR

  - Next.js

## Fiber

### 简版

- 为解决 React 遍历树过程由于无法打断导致的页面卡顿问题，定义的新的数据结构
- 单链表结构，由 return、children、siblings 组成，便于在中断后重新找回当前节点
- 更新时间超过1帧时就会产生视觉卡顿，因此通过 fiber 把浏览器渲染过程分段执行，每执行一会就让出主线程控制权（requestIdleCallback），执行优先级更高的任务
    - requestIdleCallback 这个 API 只负责低优先的级的任务处理，而高优先级的（比如动画相关）则通过 requestAnimationFrame 来控制 。
- 更新机制为双缓冲模式，current 当前视图层的树，workInProgress 正在内存中构建的树
- 更新过程 JSX -> render function -> VDOM -> fiber
<!-- - VDOM 到 fiber 的过程为 reconcile， -->



## 参考链接

[一文带你梳理 React 面试题（2023 年版本）](https://juejin.cn/post/7182382408807743548)
[React 面试题: 不一定最全但绝对值得收藏！！(1 ~ 10) (万字总结)](https://juejin.cn/post/7258071726227849277)
