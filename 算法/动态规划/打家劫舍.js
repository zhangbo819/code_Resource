function rob(arr) {
  var dp = [];
  dp[0] = 0;
  dp[1] = arr[0];

  for (var i = 2; i <= arr.length; i++) {
    console.log('arr', arr)
    console.log('dp', dp)
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i - 1])
    console.log('i, dp[i]', i, dp[i])
    console.log('\n')
  }

  return
}


console.log(rob([1, 2, 3, 2, 5, 3]))