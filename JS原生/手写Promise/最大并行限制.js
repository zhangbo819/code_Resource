// 实现一个控制 promise 并发个数限制在特定个数的函数：


//  1:
//   例如：如需要总共发送 20个 fetch 请求，但是同时限制发送个数在 5 个以内包括5个，
// 如果 5 个请求发送出去了还剩15个请求没有发送，前5个请求任何一个请求成功（此题只考虑成功情况）
// 就要将剩余15个中一个添加到4个正在请求的 pool里面，最终并发请求为5。

// 2:
//   可以用 Promise.all, Promise.race, async, await 实现。

// 3:
//     * 入参：poolLimit（对当前请求池大小进行限制，如上例中就为5）,     
//  iteratorFns （返回 promise 实例的函数数组，如 
// [() => Promise.resolve(1) , () => Promise.resolve(2), () => Promise.resolve(3)]）  

//     * 返回值：promise 执行结果（与第一个入参的 promsie 顺序保持一致）。

// TODO 进行优化
function asyncPool(poolLimit = 5, iteratorFns = []) {
  return new Promise((resolve, reject) => {
    const res = []
    let count = poolLimit, end = 4, start = 0

    try {
      fn()
    } catch (err) {
      reject(err)
    }

    function fn() {
      if (start >= iteratorFns.length) {
        resolve(res)
      }

      if (count < poolLimit) {
        end += count
        start += count
      }


      const now = iteratorFns.slice(start, end)

      now.forEach((p) => {
        p().then(itemRes => {
          res.push(itemRes)
        }).catch(err => {
          res.push(err)
        }).finally(() => {
          count--
          fn()
        })
      })
    }
  })
}