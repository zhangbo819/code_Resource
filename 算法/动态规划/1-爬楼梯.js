// from https://leetcode.cn/problems/climbing-stairs/?envType=study-plan&id=dong-tai-gui-hua-ru-men
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

// 输入 2
// 输出 2
// 解释：有两种方法可以爬到楼顶。
// 1. 1 + 1
// 2. 2

// 输入：n = 3
// 输出：3
// 解释：有三种方法可以爬到楼顶。
// 1. 1 阶 + 1 阶 + 1 阶
// 2. 1 阶 + 2 阶
// 3. 2 阶 + 1 阶


var map = { 1: 1, 2: 2 }
var climbStairs = function (n) {
  if (!map[n]) {
    map[n] = climbStairs(n - 1) + climbStairs(n - 2)
  }
  return map[n]
};

console.log(climbStairs(2))
console.log(climbStairs(3))
console.log(climbStairs(10))