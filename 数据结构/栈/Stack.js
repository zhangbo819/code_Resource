class Stack {
  items = []

  push(i) {
    this.items.push(i)
  }

  pop() {
    return this.items.pop()
  }

  top() {
    return this.items[0]
  }

  isEmpty() {
    return this.items.length === 0
  }

  size() {
    return this.items.length
  }

  clear() {
    return this.items.length = 0
  }
}

module.exports = Stack