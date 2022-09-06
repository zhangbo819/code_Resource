// 计算 n 范围内的所有质数
function calc(n = 0) {
  let i = 1;
  const res = []

  while (++i <= n) {
    // if (isPrime(i)) {
    if (isPrime2(i)) {
      res.push(i)
    }
  }


  // 判断一个数是不是质数
  function isPrime(num) {
    if (num <= 3) return true
    // 传统方式 直接查找
    for (let i = 2; i <= num / 2; ++i) {
      if (num % i == 0) {
        return false
      }
    }

    return true
  }

  // 优化，直接从结果中的质数数组里判断
  function isPrime2(num) {
    if (num <= 3) return true
    for (let i = 0; i < res.length; ++i) {
      const target = res[i]
      if (num % target === 0) return false

      if (target > num) break
    }

    return true
  }

  return res;
}


// 计算并输出执行时间
function calcByTime(n) {
  console.log('开始计算')
  const now = Date.now()
  console.log(calc(n))
  let time = Date.now() - now
  if (time > 1000) {
    time /= 1000
    time += 's'
  } else {
    time += 'ms'
  }
  console.log('计算时间', time)
}


calcByTime(1000000)