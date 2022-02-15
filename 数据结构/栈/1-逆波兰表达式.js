// ["4",	"13",	"5",	"/",	"+"]	等价于(4	+	(13	/	5))	=	6
// ["10",	"6",	"9",	"3",	"+",	"-11",	"*",	"/",	"*",	"17",	"+",	"5",	"+"]	
// 等价于((10	*	(6	/	((9	+	3)	*	-11)))	+	17)	+	5

const Stack = require('./Stack')

function calc_exp(arr = []) {
  const stack = new Stack()
  
  const f = ['*', '+', '/', '-']

  arr.forEach(i => {
    if (f.includes(i)) {
      const a = stack.pop()
      const b = stack.pop()

      var res = parseInt(eval(b + i + a))
      stack.push(res)
    } else {
      stack.push(i)
    }
  })

  return stack.pop()
}

var	exp_1	= ["4", "13", "5", "/", "+"];
var	exp_2	= ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"];
console.log(calc_exp(exp_1));
console.log(calc_exp(exp_2));