console.log(1)
var p = new Promise((resolve, reject) => {
  console.log(2)
  resolve(3)
  reject(4)
  console.log(5)
  resolve(6)
})

p.then((v) => {
  console.log(v)
  return 7
}, v => {
  console.log(v)
})

p.then((v) => {
  console.log(v)
  return 8
}).then((v) => {
  console.log(v)
})

console.log(9)