function currying(fn, ...args) {
  const length = fn.length; // 目标方法需要的参数个数
  
  let allArgs = [...args]; // 闭包保存参数

  const res = (...newArgs) => {
    allArgs = [...allArgs, ...newArgs];

    if (allArgs.length === length) {
      return fn(...allArgs); // 一致则执行
    } else {
      return res; // 否则返回自己
    }
  };
  return res;
}

// 用法如下：
// const add = (a, b, c) => a + b + c;
// const a = currying(add, 1);
// console.log(a(2, 3))