// run use: ts-node 斐波那契.ts 5
class Fib {
  // 1 1 2 3 5 8 13 21

  // 递归 直接计算
  v1(n: number): number {
    if (n === 1 || n === 2) return 1;
    return this.v1(n - 1) + this.v1(n - 2);
  }

  // map 做缓存
  v2(n: number, map: Record<number, number> = { 1: 1, 2: 1 }): number {
    // console.log(map, n, map[n]);
    if (!map[n]) {
      map[n] = this.v2(n - 1, map) + this.v2(n - 2, map);
    }
    return map[n];
  }

  // 动态规划 自低向上
  v3(n: number): number {
    const dp = [1, 1]; // 这里可以直接用两个变量滚动更新，降低空间复杂度
    for (let i = 2; i < n; i++) {
    //   console.log("dp", i, dp[i - 1], dp[i - 2]);
      dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n - 1];
  }
}

const fib = new Fib();

// 4.219s
console.time("fib v1");
console.log(fib.v1(43));
console.timeEnd("fib v1");

// 0.1ms
console.time("fib v2");
console.log(fib.v2(43));
console.timeEnd("fib v2");

// 0.112ms
console.time("fib v3");
console.log(fib.v3(43));
console.timeEnd("fib v3");
