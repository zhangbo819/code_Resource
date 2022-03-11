# 前端SDK设计

## 原则

最小可用性原则，即用最少的代码，如无必要勿增实体
最少依赖原则，即最低限度的外部依赖，如无必要勿增依赖

1. 原则
   1. 原生 ，简短 ，执行迅速 ，代码干净 ，易读 ，可测试
2. 使用场景
   1. 嵌入交互类
   2. 分析统计
   3. 封装网络服务
3. 设计模式
   1. 单例模式：一个类只返回一个实例，一旦创建再次调用就直接返回（ 如第三方库jQuery，lodash，moment等）
   2. 构造函数模式
   3. 混合模式: 原型模式 + 构造函数模式
   4. 工厂模式
   5. 发布订阅模式
4. 异步加载
   1. 同步模式 下载执行都是同步进行，页面会被阻塞
   2. defer 渲染完再执行
   3. async 下载完就执行
5. 版本控制
   1. 查询字符串路径 xxx.com/sdk.js?v=1.0.0
   2. 文件夹命名 v1.0.0/sdk.js
   3. 使用主机名或者子域名 v1.xxx.com/sdk.js
6. 命名空间
   1. 私有变量
   2. 函数作用域
7. 存储机制
   1. Cookie
   2. Session
   3. SessionStorage
8. 事件
   1. DOMContentLoaded
   2. load
   3. onreadystatechange
9. 请求
   1. 图片url，仅get
   2. post，利用构建form表单
10. 调试
11. 打包
    1. rollup，rollup-plugin-terser压缩
