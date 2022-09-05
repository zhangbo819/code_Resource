function fn(n, m, k, c, a, b, next = 0, log = 0, suffix = '') {
  let sum = 0

  const logS = new Array(log).fill('  ').join('') + suffix

  console.log(logS, 'next', next)

  const { length } = c
  if (next === length) {
    return k === c[length - 1] ? a[length - 1] : b[length - 1]
  }

  for (let i = next; i < length; i++) {
    if (k === c[i]) {
      // 本来就在
      console.log(logS, '本来就在', sum, a[i])
      sum += a[i]
    } else {
      // 不在这个城市
      const nextDay = i + 1
      console.log(logS, '出发')
      let canGo
      if (length === nextDay) {
        // 最后一天了不需要判断，直接去
        canGo = true
      } else {
        const leftSum = b[i] + fn(n, m, c[i], c, a, b, nextDay, log + 1, '左')
        const rightSum = fn(n, m, k, c, a, b, nextDay, log + 1, '右')
        canGo = leftSum > rightSum
        console.log(logS, '回来了', leftSum, rightSum)
      }
      if (canGo) {
        // 去
        sum += b[i]
        k = c[i]
      } else {
        // 不去 0
      }
    }
    console.log(logS, 'sum', sum)
  }

  return sum
}

// console.log(fn(3, 5, 1, [2, 1, 2, 3, 2], [9, 6, 2, 1, 7], [1, 3, 0, 5, 2]))
// console.log(fn(3, 5, 1, [2], [9], [1]))
// console.log(
//   fn(
//     3, 5, 1,
//     [2, 1],
//     [9, 7],
//     [2, 4]
//   )
// )
console.log(
  fn(
    3, 5, 1,
    [2, 1, 2],
    [9, 7, 4],
    [4, 5, 0]
  )
)