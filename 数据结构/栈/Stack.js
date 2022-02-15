class Stack {
  items = []

  push(i) {
    this.items.push(i)
  }

  pop() {
    return this.items.pop()
  }

  top() {
    return this.items[this.items.length - 1]
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