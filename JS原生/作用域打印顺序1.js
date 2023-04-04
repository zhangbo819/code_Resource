var name = 'World!';
(function () {
  if (typeof name === 'undefined') {
    var name = 'Jack'
    console.log('Hello ' + name)
  } else {
    console.log('Hello ' + name)
  }
})()

var name = "After"