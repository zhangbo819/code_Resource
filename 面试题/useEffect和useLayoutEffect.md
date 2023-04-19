# useEffect 和 useLayoutEffect 的原理与区别

- useEffect 和 useLayoutEffect 作为组件的副作用，本质上是一样的。
- 共用一套结构来存储 effect 链表。整体流程上都是先在 render  阶段，生成 effect，并将它们拼接成链表，存到 fiber.updateQueue 上，最终带到commit 阶段被处理。
- 他们彼此的区别只是最终的执行时机不同，一个异步一个同步，这使得 useEffect 不会阻塞渲染，而 useLayoutEffect 会阻塞渲染。  

## 参考链接

[梳理 useEffect 和 useLayoutEffect 的原理与区别](https://juejin.cn/post/6921688408737710087)
