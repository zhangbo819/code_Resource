var aaa = '100'

var obj = {
  aaa: '200',
  b: {
    aaa: '300',
    fn () {
      return this.aaa
    }
  }
}

console.log(obj.b.fn())   // 300
var c = obj.b.fn
console.log(c())          // undefined