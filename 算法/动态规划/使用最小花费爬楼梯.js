// form https://leetcode.cn/problems/min-cost-climbing-stairs/?envType=study-plan&id=dong-tai-gui-hua-ru-men

// 给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。一旦你支付此费用，即可选择向上爬一个或者两个台阶。

// 你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。

// 请你计算并返回达到楼梯顶部的最低花费。

// 示例 1：
// 输入：cost = [10,15,20]
// 输出：15
// 解释：你将从下标为 1 的台阶开始。
// - 支付 15 ，向上爬两个台阶，到达楼梯顶部。
// 总花费为 15 。

// 示例 2：
// 输入：cost = [1,100,1,1,1,100,1,1,100,1]
// 输出：6
// 解释：你将从下标为 0 的台阶开始。
// - 支付 1 ，向上爬两个台阶，到达下标为 2 的台阶。
// - 支付 1 ，向上爬两个台阶，到达下标为 4 的台阶。
// - 支付 1 ，向上爬两个台阶，到达下标为 6 的台阶。
// - 支付 1 ，向上爬一个台阶，到达下标为 7 的台阶。
// - 支付 1 ，向上爬两个台阶，到达下标为 9 的台阶。
// - 支付 1 ，向上爬一个台阶，到达楼梯顶部。
// 总花费为 6 。


var minCostClimbingStairs = function (arr) {
  if (arr.length === 1) return arr[0]
  if (arr.length === 2) return Math.min(arr[0], arr[1])

  const costArr = [arr[0], arr[1]];

  for (let i = 2; i < arr.length; i++) {
    costArr[i] = Math.min(costArr[i - 1], costArr[i - 2]) + arr[i]
  }

  return Math.min(costArr[costArr.length - 1], costArr[costArr.length - 2])
};

console.log(minCostClimbingStairs([10, 15, 20]))
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]))