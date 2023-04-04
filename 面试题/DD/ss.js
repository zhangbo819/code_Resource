// input {
//   a: 1,
//   b: { i: 0 },
//   c: {
//     d: 10,
//     d: {
//       e: 20
//     }
//   },
//   f: 30
// }
//  output [ [ 1, 30 ], [ 0 ], [ 20 ] ]
function fn(obj, index = 0) {
  const res = new Array(index).fill(0)
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      const r = fn(obj[key], index + 1)
      r.forEach((item, j) => {
        if (!res[j]) res[j] = []
        if (item) {
          res[j] = res[j].concat(item)
        }
      })
    } else {
      if (!res[index]) res[index] = []
      res[index].push(obj[key])
    }
  }
  return res
}

console.log(
  fn({
    a: 1,
    b: { i: 0 },
    c: {
      d: 10,
      d: {
        e: 20
      }
    },
    f: 30
  })
)