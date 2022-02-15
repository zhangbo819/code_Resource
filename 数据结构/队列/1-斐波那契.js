const Queue = require('./Queue')

function fb(n = 0) {
  if (n <= 2) return 1
  const queue = new Queue()
  queue.enqueue(1)
  queue.enqueue(1)

  while (n-- > 2) {
    const last = queue.dequeue()
    const head = queue.head()

    queue.enqueue(last + head)
  }

  return queue.tail()
}

// 1 1 2 3 5 8 13
console.log(fb(7))