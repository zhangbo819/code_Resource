// 请编写一个函数判断字符串中括号是否合法，所谓合法，就是括号成对出现
// sdf(ds(ew(we)rw)rwqq)qwewe			合法
// (sd(qwqw)sd(sd))													合法
// ()()sd()(sd()fw))(											不合法


const Stack = require('./Stack')

function reg(string) {
  const stack = new Stack()

  for (let i = 0, len = string.length; i < len; i++) {
    if (string[i] === '(') {
      stack.push(string[i])
    } else if (string[i] === ')') {
      if (stack.isEmpty()) {
        return false
      } else {
        stack.pop()
      }
    }
  }
  return stack.isEmpty()
}

console.log(reg('sdf(ds(ew(we)rw)rwqq)qwewe'))
console.log(reg('(sd(qwqw)sd(sd))'))
console.log(reg('()()sd()(sd()fw))('))