const Stack = require('./Stack')

class MinStack {
  data_stack = new Stack(); //	普通的栈
  min_stack = new Stack(); //	专⻔存储最⼩值

  //	push的时候,两个栈都要操作
  push (item) {
    this.data_stack.push(item); //	data_stack是常规栈,常规操作即可
    //	如果min_stack为空,直接放⼊,如果item⼩于min_stack栈顶元素,放⼊其中
    //	这样做的⽬的,是保证min_stack的栈顶始终保存栈的最⼩值
    if (this.min_stack.isEmpty() || item < this.min_stack.top()) {
      this.min_stack.push(item);
    } else {
      //	如果item⼤于等于栈顶元素,把min_stack的栈顶元素再放⼊⼀次
      //	min_stack的元素个数要和data_stack	保持⼀致
      this.min_stack.push(this.min_stack.top());
    }
  };
  //	pop的时候,两个栈都pop
  pop () {
    this.data_stack.pop();
    this.min_stack.pop();
  };
  //	直接取栈顶的元素
  min () {
    return this.min_stack.top();
  };
};

minstack = new MinStack();
minstack.push(3);
minstack.push(6);
minstack.push(8);
console.log(minstack.min());
minstack.push(2);
console.log(minstack.min());