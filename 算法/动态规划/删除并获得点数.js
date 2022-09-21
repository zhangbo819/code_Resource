// form https://leetcode.cn/problems/delete-and-earn/?envType=study-plan&id=dong-tai-gui-hua-ru-men
// 给你一个整数数组 nums ，你可以对它进行一些操作。

// 每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。之后，你必须删除 所有 等于 nums[i] - 1 和 nums[i] + 1 的元素。

// 开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。


// 示例 1：
// 输入：nums = [3,4,2]
// 输出：6
// 解释：
// 删除 4 获得 4 个点数，因此 3 也被删除。
// 之后，删除 2 获得 2 个点数。总共获得 6 个点数。

// 示例 2：
// 输入：nums = [2,2,3,3,3,4]
// 输出：9
// 解释：
// 删除 3 获得 3 个点数，接着要删除两个 2 和 4 。
// 之后，再次删除 3 获得 3 个点数，再次删除 3 获得 3 个点数。
// 总共获得 9 个点数。

// var deleteAndEarn = function (nums) {
//   // 先转成 map
//   var map = {}
//   for (let i = 0, len = nums.length; i < len; i++) {
//     if (map[nums[i]]) {
//       map[nums[i]] += nums[i]
//     } else {
//       map[nums[i]] = nums[i]
//     }
//   }

//   console.log(map)
//   // [[2, 3, 4], [6], [9, 10]];

//   // 然后计算
//   var dp = [];
//   var used = {}
//   for (let num in map) {
//     const left = map[num - 1] ? map[num - 1] : 0
//     // const right = map[num + 1] ? map[num + 1] : 0

//     used[num] = true

//     if (map[num] > dp[dp.length - 1] + left) {
//       dp.push(dp[dp.length - 1] + map[num])
//     } else {
      
//     }
    
//     console.log(dp)
//   }
//   return dp
// };

const { rob } = require('./打家劫舍.js')

var deleteAndEarn = function(nums) {
  let maxVal = 0;
  for (const val of nums) {
      maxVal = Math.max(maxVal, val);
  }
  const sum = new Array(maxVal + 1).fill(0);
  for (const val of nums) {
      sum[val] += val;
  }
  console.log('sum', sum)
  // [ 0, 0, 4, 9, 4, 0, 0, 0, 8]
  return rob(sum);
};


console.log(deleteAndEarn([2, 2, 3, 3, 3, 4, 8]))
