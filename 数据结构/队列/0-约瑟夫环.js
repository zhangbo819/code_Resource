const Queue = require('./Queue')

function del_ring (arr = []) {
  var queue = new Queue()

  arr.forEach(i => queue.enqueue(i))

  var index = 0

  while (queue.size() != 1) {
    var item = queue.dequeue()
    index += 1

    if (index % 3 == 0) {
      queue.enqueue(item)
    }
  }

  return queue.head()
}


console.log(del_ring(new Array(100).fill(1).map((j, i) => i)))