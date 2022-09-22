// form https://leetcode.cn/problems/jump-game/?envType=study-plan&id=dong-tai-gui-hua-ru-men
// 给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。

// 数组中的每个元素代表你在该位置可以跳跃的最大长度。

// 判断你是否能够到达最后一个下标。



// 示例 1：
// 输入：nums = [2,3,1,1,4]
// 输出：true
// 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。

// 示例 2：
// 输入：nums = [3,2,1,0,4]
// 输出：false
// 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0，所以永远不可能到达最后一个下标。

// [0,2,3]
// false

// [0]
// true

// [1,0,1,0]
// false


/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 暴力破解 从最后一个往回一个个试
var canJump = function (nums) {
  var res = true
  for (let i = nums.length - 1; i >= 0;) {
    if (i === 0) {
      if (nums[i] < 1 && nums.length > 1) {
        res = false
      }
      break
    }
    let r = false
    for (var j = i - 1; j >= 0; j--) {
      if (nums[j] >= (i - j)) {
        r = true
        i = j
        break
      }
    }
    // console.log(nums[i], i, res)
    if (!r) {
      res = false
      break
    }
  }
  return res
};

// 优化
var canJump = (nums) => {
  var k = 0
  for (let i = 0; i < nums.length; i++) {
    if (i > k) return false;
    k = Math.max(k, i + nums[i]);
    console.log('k', k)
  }

  return k
}

// console.log(canJump([2, 3, 0, 1, 4])) // true
// console.log(canJump([3, 2, 1, 0, 4])) // false
// console.log(canJump([0, 2, 3])) // false
// console.log(canJump([0])) // true
// console.log(canJump([1, 0, 1, 0])) // false
console.log(canJump([3, 2, 4, 0, 1, 0])) // true


