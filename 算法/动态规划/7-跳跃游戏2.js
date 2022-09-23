// form https://leetcode.cn/problems/jump-game-ii/?envType=study-plan&id=dong-tai-gui-hua-ru-men
// 给你一个非负整数数组 nums ，你最初位于数组的第一个位置。

// 数组中的每个元素代表你在该位置可以跳跃的最大长度。

// 你的目标是使用最少的跳跃次数到达数组的最后一个位置。

// 假设你总是可以到达数组的最后一个位置。

//  

// 示例 1:
// 输入: nums = [2,3,1,1,4]
// 输出: 2
// 解释: 跳到最后一个位置的最小跳跃数是 2。
//      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。

// 示例 2:
// 输入: nums = [2,3,0,1,4]
// 输出: 2

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  var dp = []
  dp[0] = 0
  for (let i = 0; i < nums.length - 1; i++) {
    const count = nums[i]
    const max = Math.min(i + count, nums.length - 1)
    for (let j = i; j <= max; j++) {
      if (dp[j] >= 0) {
      } else {
        dp[j] = dp[i] + 1
      }
    }
  }
  console.log(dp)
  return dp[dp.length - 1]
};

var jump = function (nums) {
  var k = 0
  for (let i = 0; i < nums.length; i++) {
    if (i > k) return false;
    k = Math.max(k, i + nums[i]);
    console.log('k', k)
  }

  return k
}


// console.log(jump([2, 3, 1, 1, 4])) // 2
// console.log(jump([2, 3, 0, 1, 4])) // 2
// console.log(jump([3, 1, 2, 2, 4, 1, 1])) // 3
console.log(jump([2, 3, 1])) // 1