// 找给定字符串的所有子串权值
function fn(str = '') {
  // 找所有子串
  // var arr = []

  for (let i = 0; i <= str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      const s = str.slice(i, j)
      // arr.push(target)

      // 计算所有子串权值
      var count = map[s]
      if (!map[s]) {
        count = findNum(s)
      }
      res += count
    }
  }

  // console.log(arr, arr.length)

  // let res = 0
  // var map = {}
  // arr.forEach((s) => {
  //   var count = map[s]
  //   if (!map[s]) {
  //     count = findNum(s)
  //   }
  //   res += count
  // })

  return res
}

// 找一个串的权值
// ())()) 4
function findNum(s = '') {
  let n = 0
  const stack = []

  s.split('').forEach(i => {
    if (i === '(') {
      stack.push('(')
    } else if (i === ')') {
      if (stack.length) {
        n += 2
      }
      stack.pop()
    }
  })

  console.log(n)

  return n
}

console.log(fn('())())')) // 26