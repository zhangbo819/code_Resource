// 题目描述
// 给你一个可装载重量为 W 的背包和 N 个物品，每个物品有重量和价值两个属性。
// 其中第 i 个物品的重量为 wt[i]，价值为 val[i]，现在让你用这个背包装物品，最多能装的价值是多少？

// 举个简单的例子，输入如下：

// N = 3, W = 4
// wt  = [2, 1, 3]
// val = [4, 2, 3]

//     w
//     0 1 2 3 4   5 6
// n 0 0 0 0 0 0   0 0
// n 1 0 2 4 4 4   4 4
// n 2 0 2 4 6 6   6 6
// n 3 0 2 4 6 6   6 9

// 例子二

// N = 5, W = 6
// wt  = [2, 1, 3, 1, 2]
// val = [4, 2, 4, 1, 3]

//     w
//     0 1 2 3 4 5 6
// n 0 0 0 0 0 0 0 0
// n 1 0 2 4 4 4 4 4
// n 2 0 2 4 6 ? 8 8
// n 3 0 2 4 6 6 9 ?
// n 4 0 2 4 6

//     w
//     0 1 2 3 4 5 6
// n 0 0 0 0 0 0 0 0
// n 1 0 2 4 4 4 4 4
// n 2 0 2 4 6

// i=2 w=3
//          dp[1][3] = 4
//          dp[1][3 - wt[1]] + val[1]
//          dp[1][2] + 2
//          4 + 2

// i=2 w=4
//          dp[1][4] = 4
//          dp[1][4 - wt[1]] + val[1]
//          dp[1][3] + 2
//          4 + 2

// function knapsack01(W = 0, wt = [], val = []) {
//   const N = wt.length;
//   // 已初始化的base case
//   var dp = new Array(N + 1).fill().map(() => new Array(W + 1).fill(0));
//   for (var i = 1; i <= N; i++) {
//     for (var w = 1; w <= W; w++) {
//       if (w - wt[i - 1] < 0) {
//         // 这种情况下只能选择不装入背包
//         dp[i][w] = dp[i - 1][w];
//       } else {
//         // 装入或者不装入背包，择优
//         dp[i][w] = Math.max(
//           dp[i - 1][w - wt[i - 1]] + val[i - 1],
//           dp[i - 1][w]
//         );
//       }
//     }
//   }

//   console.table(dp);

//   return dp[N][W];
// }

function knapsack01(W = 0, wt = [], val = []) {
  const N = wt.length;
  const dp = Array(N)
    .fill()
    .map(() => Array(W + 1).fill(0));

  // 初始化
  for (let j = wt[0]; j <= W; j++) {
    dp[0][j] = val[0];
  }

  // wt 数组的长度len 就是物品个数
  for (let i = 1; i < N; i++) {
    // 遍历物品
    for (let j = 0; j <= W; j++) {
      // 遍历背包容量
      if (j < wt[i]) dp[i][j] = dp[i - 1][j];
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - wt[i]] + val[i]);
    }
  }

  console.table(dp);

  return dp[N - 1][W];
}

// console.log(knapsack01(3, [2, 1, 3], [4, 2, 3]));
console.log(knapsack01(6, [2, 1, 3, 1, 2], [4, 2, 4, 1, 3]));
