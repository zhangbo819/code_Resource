// 未完成
var map = {
  1: 0,
  2: 1
}

function fn(arr = []) {
  let res = 0;

  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i]

    res += calcMin(item)
  }

  return res
}


function calcMin(num) {
  if (typeof map[num] !== 'undefined') return map[num]
  // TODO 计算一个数的因数，如 6 = 2 * 3
  const a = Math.round(Math.sqrt(num))
  const b = num / a
  console.log('a', a)
  console.log('b', b)
  
  map[a] = calcMin(a)
  map[b] = calcMin(b)
}

// 计算将数组中，每项分解成全是1需要几步
// 分解方法有两种，1. 分成 1 和 n - 1， 2. 分成因数，6 = 2 * 3
// 入参 [2, 6]
// 输出 5
// 第一次 [1, 1, 6]
// 第二次 [1, 1, 2, 3]
// 第三次 [1, 1, 1, 1, 3]
// 第四次 [1, 1, 1, 1, 2, 1]
// 第五次 [1, 1, 1, 1, 1, 1, 1]
console.log(fn([2, 6]))