// 大数相加
// 题目描述:实现一个add方法完成两个大数相加

let a = "9007199254740991";
let b = "1234567899999999999";

function add(a = '', b = '') {
  let maxLength = Math.max(a.length, b.length)

  a = a.padStart(maxLength, 0)
  b = b.padStart(maxLength, 0)

  let sum = ''
  let jw = 0 // 进位

  // 每个位相加并计算进位
  for (let i = maxLength - 1; i >= 0; i--) {
    const number = Number(a[i]) + Number(b[i]) + jw
    jw = Math.floor(number / 10)
    sum = number % 10 + sum
  }

  if (jw) {
    sum = '' + jw + sum
  }

  return sum
}

console.log(add(a, b))
console.log(add('1438', '562'))
console.log(add('1000', '560'))
