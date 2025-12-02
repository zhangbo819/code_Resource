function fn(a: number, b: number) {
  let xj = a * 0.78 * 12
  let gj = a * 0.24 * 12
  let nz = a * 3.5
  let sum = xj + gj + nz

  let sui = 4 // todo
  let buffer = 20

  let sub = b * 12 + sui + buffer

  return { n: sum - sub, xj, gj }
}

type param = [a: number, b: number][]

// function fn2(d: param) {
//   let res = { n: 0, xj: 0, gj: 0 }
//   d.forEach((i) => {
//     const item = fn.apply(this, i)
//     console.log(item)
//     res.n += item.n
//     res.xj += item.xj
//     res.gj += item.gj
//   })
//   console.log(res)
//   // obj: { n: number, xj: number, gj: number }, 
// }

function to(s: string) {
  let r: param = []
  s.split(';').forEach(si => {
    let sia = si.split(',').map(i => +i)
    r.push(sia as [a: number, b: number])
  })
  return r
}

// console.log(fn())
// console.log(fn2)
// fn2(to(process.argv[2]))

function fn3 (base: number, increase: number) {
    let x = base;
    let n = 0;

    while (x < base + increase) {
      x *= 1.01
      n++
    }

    return n
}
// console.log(fn3(14, 2.3))
console.log(fn3(15.5, 2.3))