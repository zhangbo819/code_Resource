// 不能取连续的两个，找到最优路线
function rob(arr) {
  var dp = [];
  dp[0] = 0;
  dp[1] = arr[0];

  for (var i = 2; i <= arr.length; i++) {
    console.log('arr', arr)
    console.log('dp', dp)
    // 对于每次计算，当前的最优是对比 前1个 与 前2个和现在的和 更大的一个
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i - 1])
    console.log('i, dp[i]', i, dp[i])
    console.log('\n')
  }

  return
}


// console.log(rob([1, 2, 3, 2, 5, 3]))
console.log(rob([2, 7, 9, 3, 1]))