// https://leetcode.cn/problems/maximum-subarray
// 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

// 子数组 是数组中的一个连续部分。


// 示例 1：

// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

// 示例 2：

// 输入：nums = [1]
// 输出：1
// 示例 3：

// 输入：nums = [5,4,-1,7,8]
// 输出：23


/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums = []) {
  var res = nums[0]
  
  var dp = []

  dp[0] = nums[0]

  for (let i = 1; i < nums.length; i++) {
    // dp 保存的是之前最优的排列
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])

    res = Math.max(res, dp[i])
  }

  console.log(dp)

  return res
};

// 优化 滚动数组
var maxSubArray = function (nums = []) {
  var res = nums[0]
  
  var dp = nums[0]

  for (let i = 1; i < nums.length; i++) {
    // dp 保存的是前一位最优
    dp = Math.max(dp + nums[i], nums[i])

    res = Math.max(res, dp)
  }

  console.log(dp)

  return res
};


// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])) // 6
console.log(maxSubArray([5, 4, -1, 7, 8])) // 23
console.log(maxSubArray([1])) // 23