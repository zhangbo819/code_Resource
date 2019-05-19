# redux 和 redux-saga 和 Vedux 使用心得

## redux、react-redux、redux-saga

# Redux有什么用？
- 主要用于解决react中**组件间相互通信状态**，特别是复杂结构的组件。
1. 深层级间通信，如：简单的父与子间通信，中间隔了0层，只需传递一次，但如果是 父 与 子的子通信，中间隔了1层，就需要父先传递给子，子在传递给子的子，需要传递两次。**由此可见，组件间层级越深，中间隔得层级越多，传递次数就越多**，硬写的话会有大量传递相关的重复代码。而Redux可以**自动传递**，不需要手动书写。
2. 组件间通信可以分成两类，1.获取其他组件状态内的来更新自己状态。2.改变其他组件内的状态并使其重新渲染。如果是第一条获取其他组件内的状态实现方法比较多，但是第二条传统方法就比较麻烦了，因为要使其重新渲染（render）只有两种方式，1.改变其props，但也需让其父组件重新render，比直接让自己重新render更麻烦。2.通过自己的this.setState方法，但不同的组件this是不同的而且即使是同一个状态（state）在不同组件间也不一定是同名的，所以如果保存所有需要更新的组件的this以及其相应state中的key，又比较麻烦。

---

# Redux如何运作？
- Redux的运作方式是 创建唯一一个公共的store用于保存所有组件内的状态，当store中的状态改变后会自动在最顶端的组件自顶向下向所有的组件传递，而只有订阅了相关state的组件才会更新（可能需要自己写逻辑判断）。而改变store则通过，用户触发actions -> redux选取事前写好的纯函数reducers -> reducers改变store中的state -> 自动更新关注（订阅）了相关state的connect(react-redux)连接的组件 ，所以实际只有两间事要做:
1. 获取。有了一个全局store，并可以从全局store中获取当前的某个state，从而更新页面状态
2. 更新。我们可以通过调取后端接口或其他方式来获得最新的数据（state），然后再保存到store中，进而触发第一条，从而更新页面

---

# Redux如何使用？
- 将 顶层组件 包裹上一层由 react-redux 提供的 Provider 组件
- 将 所需store的组件 改为由 react-redux 提供的 connect 函数返回的 HOC
> 1. 而connect需要三个参数, 相关react组件，mapStateToProps（需要订阅的state），mapDispatchToProps（需要改变store的函数）
> 2. mapStateToProps 比较使用简单，订阅（写在其对象中）相关的state，使用时直接通过this.props.abc就可获取的store中的abc，而在store发生变化，会自动渲染
> 3. mapDispatchToProps 比较复杂，需要redux中的 bindActionCreators ，bindActionCreators 需要两个参数，一个是自动传来的dispatch，一个是actions。actions由type和需要reducers更改的state（新的state）组成。这样就可以通过this.props.functions 调取在 创建store时传递过去的reducers中的 相关type的functions方法。

---

# redux-saga有什么用？
- 主要来处理异步问题（to do应该还有别的）
1. 同步：actions -> reducers -> store 。
2. 异步：actions -> middlewares(saga) —> actions -> reducers -> store 。sage会首先接收相关类型的actions，然后可以进行逻辑处理，如异步的网络请求，等待获取的结果后再调取相关的 reducers 来更新store。

