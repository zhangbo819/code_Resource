# JS事件循环

## Event Loop

在JavaScript中，任务被分为两种，一种宏任务（MacroTask）也叫Task，一种叫微任务（MicroTask）。

### MacroTask（宏任务）

1. script全部代码
2. setTimeout
3. setInterval
4. setImmediate（浏览器暂时不支持，只有IE10支持，具体可见MDN）
5. I/O
6. UI Rendering

### MicroTask（微任务）

1. Process.nextTick（Node独有）
2. Promise
3. Object.observe(废弃)
4. MutationObserver（具体使用方式查看[外链 - 这里](http://javascript.ruanyifeng.com/dom/mutationobserver.html)）

## 浏览器中的事件循环

Javascript 有一个 **main thread** 主线程和 **call-stack** 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。

### JS调用栈

JS调用栈采用的是后进先出的规则，当函数执行的时候，会被添加到栈的顶部，当执行栈执行完成后，就会从栈顶移出，直到栈内被清空。

### 同步任务和异步任务

Javascript单线程任务被分为同步任务和异步任务，同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/18/1685f03d7f88792b~tplv-t2oaga2asx-watermark.awebp">

任务队列Task Queue，即队列，是一种先进先出的一种数据结构。

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/18/1685f037d48da0de~tplv-t2oaga2asx-watermark.awebp">

### 事件循环的进程模型

- 选择当前要执行的任务队列，选择任务队列中最先进入的任务，如果任务队列为空即null，则执行跳转到微任务（MicroTask）的执行步骤。
- 将事件循环中的任务设置为已选择任务。
- 执行任务。
- 将事件循环中当前运行任务设置为null。
- 将已经运行完成的任务从任务队列中删除。
- microtasks步骤：进入microtask检查点。
- 更新界面渲染。
- 返回第一步。

### 执行进入microtask检查点时，用户代理会执行以下步骤

- 设置microtask检查点标志为true。
- 当事件循环microtask执行不为空时：选择一个最先进入的microtask队列的microtask，将事件循环的microtask设置为已选择的microtask，运行microtask，将已经执行完成的microtask为null，移出microtask中的microtask。
- 清理IndexDB事务
- 设置进入microtask检查点的标志为false。

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/18/1686078c7a2f63e5~tplv-t2oaga2asx-watermark.awebp">

### 总结

- 执行栈在执行完同步任务后，查看执行栈是否为空，如果执行栈为空，就会去检查微任务(microTask)队列是否为空，如果为空的话，就执行Task（宏任务），否则就一次性执行完所有微任务。
- 每次单个宏任务执行完毕后，检查微任务(microTask)队列是否为空，如果不为空的话，会按照先入先出的规则全部执行完微任务(microTask)后，设置微任务(microTask)队列为null，然后再执行宏任务，如此循环。

## Node中的事件循环

TODO

## 参考链接

[外链 - 一次弄懂Event Loop（彻底解决此类面试问题）](https://juejin.cn/post/6844903764202094606#heading-6)
