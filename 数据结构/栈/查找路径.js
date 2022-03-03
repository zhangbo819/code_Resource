// 输入一个路径，输出简化后的路径
class Stack {
  constructor() {
    this.data = []
  }

  pop() {
    return this.data.pop()
  }

  push(item) {
    this.data.push(item)
  }

  print() {
    return this.data
  }
}

function findPath (path = '') {
  const stack = new Stack()
  path = path.slice(1).split('/')
  path.forEach(item => {
    if (item === '.' || item === '') {

    } else if (item === '..') {
      stack.pop()
    } else {
      stack.push(item)
    }
  })

  return '/' + stack.print().join('/')
}

console.log(findPath('/../a'))
console.log(findPath('/./a/c'))
console.log(findPath('/a/b/cc/../d/../x'))
// console.log(findPath(''))