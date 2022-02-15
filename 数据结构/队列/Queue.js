class Queue {
  items = []

  enqueue(i) {
    this.items.push(i)
  }

  dequeue() {
    return this.items.shift()
  }

  head() {
    return this.items[0]
  }

  size() {
    return this.items.length
  }

  clear() {
    return this.items.length = 0
  }

  isEmpty() {
    return this.items.length === 0
  }

  tail() {
    return this.items[this.items.length - 1]
  }
}

module.exports = Queue