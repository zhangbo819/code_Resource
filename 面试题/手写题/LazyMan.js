


class Lazy {
  constructor() {
    return (name) => {
      const firstTask = () => {
        console.log('Hi This is ' + name)
      }
      this.callbacks = {
        0: [firstTask]
      }
      this.active = 0
      this.timer = null
      this.start()
      return this
    }
  }

  start() {
    this.timer && clearTimeout(this.timer)

    this.timer = setTimeout(() => {
      console.log('this.callbacks', this.callbacks)
      for (let time in this.callbacks) {
        setTimeout(() => {
          this.callbacks[time].forEach(cb => {
            cb()
          })
        }, time * 1000)
      }
    })
  }

  eat(name) {
    if (!this.callbacks[this.active]) {
      this.callbacks[this.active] = []
    }

    this.callbacks[this.active].push(() => {
      console.log('Eat ' + name)
    })

    this.start()

    return this
  }


  sleep(time) {
    this.active += time

    const firstTask = () => {
      console.log('Wake up after ' + time)
    }

    this.callbacks[this.active] = [firstTask]

    this.start()

    return this

  }

  sleepFirst(time) {
    const firstTask = () => {
      console.log('Wake up after ' + time)
    }
    const newCallbacks = { 0: [firstTask] }
    for (let t in this.callbacks) {
      newCallbacks[t + time] = this.callbacks[t]
    }

    this.active += time

    this.start()

    return this

  }

}

const LazyMan = new Lazy()

// LazyMan("Hank")
// 输出: Hi! This is Hank!

// LazyMan("Hank").sleep(10).eat("dinner")
// 输出:
// Hi! This is Hank!
// Wake up after 10
// Eat dinner~

// LazyMan("Hank").eat("dinner").eat("supper")
// 输出:
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan("Hank").sleepFirst(5).eat("supper")
// 输出:
// Wake up after 5
// Hi This is Hank!
// Eat supper