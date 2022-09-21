// 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

// 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。


// 示例 1：

// 输入：[1,2,3,1]
// 输出：4
// 解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
// 偷窃到的最高金额 = 1 + 3 = 4 。

// 示例 2：

// 输入：[2,7,9,3,1]
// 输出：12
// 解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
// 偷窃到的最高金额 = 2 + 9 + 1 = 12 。



// 不能取连续的两个，找到最优路线
function rob(arr) {
  var dp = [];
  dp[0] = arr[0];
  dp[1] = Math.max(arr[0], arr[1]);

  // console.log('arr', arr)
  // arr [1, 2, 3, 2, 5, 3]
  // dp  [1, 2]
  // dp  [1, 2, max(2, 1 + 3)]
  for (var i = 2; i < arr.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i])
  }

  // console.log(dp)

  return dp[dp.length - 1]
}

// 优化 不用数组 降低空间复杂度
const rob = (nums) => {
  const size = nums.length;
  let first = nums[0], second = Math.max(nums[0], nums[1]);
  for (let i = 2; i < size; i++) {
    let temp = second;
    second = Math.max(first + nums[i], second);
    first = temp;
  }
  return second;
}


console.log(rob([1, 2, 3, 2, 5, 3])) // 9
console.log(rob([2, 7, 9, 3, 1])) // 12

module.exports = { rob }