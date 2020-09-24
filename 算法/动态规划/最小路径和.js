var minPathSum = function (grid) {
  var m = grid.length;
  var n = grid[0].length;
  var dp = Array.from({ length: grid.length }, item => item = []);
  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = grid[i][j]
      } else if (i === 0 && j !== 0) {
        dp[i][j] = grid[i][j] + dp[i][j - 1]
      } else if (i !== 0 && j === 0) {
        dp[i][j] = grid[i][j] + dp[i - 1][j]
      } else {
        dp[i][j] = grid[i][j] + Math.min(dp[i][j - 1], dp[i - 1][j])
      }
    }
  }
  console.log('dp', dp)
  return dp[m - 1][n - 1]
};

console.log(minPathSum([
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
]))

// [
//   [1, 4, 5],
//   [2, 7, 6],
//   [6, 8, 7]
// ]