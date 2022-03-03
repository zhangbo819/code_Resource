// 用一个全局变量储存当前激活的 effect 函数
let activeEffect
// effect 栈
const effectStack = []

function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    // 在调用副作用函数之前将当前副作用函数压入到栈中
    effectStack.push(effectFn)
    const res = fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]

    return res
  }

  // 将 options 挂载到 effectFn
  effectFn.options = options

  effectFn.deps = []

  // 非 lazy 的时候，才执行
  if (!options.lazy) {
    // 执行副作用函数
    effectFn()
  }

  // 将副作用函数作为返回值返回
  return effectFn
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}


// 定义一个任务队列
const jobQueue = new Set()
const p = Promise.resolve()

let isFlushing = false
function flushJob() {
  if (isFlushing) return

  isFlushing = true

  p.then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => {
    isFlushing = false
  })
}