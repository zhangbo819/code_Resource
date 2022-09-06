// 一 分解质因数的函数 改
function decomposition(num) {
  let res = []

  // 如果被分解的数为1、2、3，则直接存入数组，并返回结果
  if ((num == 1) || (num == 2) || (num == 3)) {
    return [num];
  }
  // num / 2 是因为 如果在num的一半大小之前如果没有找到因数，那么之后也不会有，因此不需要后面的部分也进入循环，提升效率
  for (var i = 2; i <= num / 2; i++) {
    if (num % i == 0) {
      // 存下一个因数（后面跳出循环保证存入的是最小的）
      res.push(i);
      // 除以因数后，继续进行分解操作
      res = res.concat(decomposition(num / i));
      // 跳出循环，确保存入数组的是最小的因数
      break;
    }
  }
  // 存放最后一个质因数
  if (i > num / 2) {
    res.push(num);
  }
  return res;
}

// 调用
// console.log(decomposition(23))
// console.log(decomposition(24))
// console.log(decomposition(999))

// 二 找到所有因数
function factor(n = 0) {
  let i = 1;
  const res = []

  while (++i <= n) {
    if (n % i === 0) {
      res.push(i)
    }
  }

  return res;
}

console.log(factor(24))