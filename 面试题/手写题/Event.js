// 一个事件系统
// 实现Event
// 它的用法如下：

var event = new Event()

event.on('eventName', function (data) {
  console.log(data.msg)
})
event.on('eventName', function (data) {
  console.log('这是注册的第二个事件')
})
event.emit('eventName', { msg: '触发了事件' })


class Event {
  constructor() {
    this.map = {}
  }

  on(name, callback) {
    if (!this.map[name]) {
      this.map[name] = []
    }

    this.map[name].push(callback)
  }

  emit(name, data) {
    if (!this.map[name]) return

    this.map[name].forEach((cb) => {
      cb(data)
    })
  }
}