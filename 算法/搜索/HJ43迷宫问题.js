// 描述
// 定义一个二维数组 N*M ，如 5 × 5 数组下所示：

// int maze[5][5] = {
// 0, 1, 0, 0, 0,
// 0, 1, 1, 1, 0,
// 0, 0, 0, 0, 0,
// 0, 1, 1, 1, 0,
// 0, 0, 0, 1, 0,
// };

// 它表示一个迷宫，其中的1表示墙壁，0表示可以走的路，只能横着走或竖着走，不能斜着走，要求编程序找出从左上角到右下角的路线。入口点为[0,0],既第一格是可以走的路。

// 输入描述：
// 输入两个整数，分别表示二维数组的行数，列数。再输入相应的数组，其中的1表示墙壁，0表示可以走的路。数据保证有唯一解,不考虑有多解的情况，即迷宫只有一条通道。

// 输出描述：
// 左上角到右下角的最短路径，格式如样例所示。

// 输入：
// 5 5
// 0 1 0 0 0
// 0 1 1 1 0
// 0 0 0 0 0
// 0 1 1 1 0
// 0 0 0 1 0
//
// 输出：
// (0,0)
// (1,0)
// (2,0)
// (2,1)
// (2,2)
// (2,3)
// (2,4)
// (3,4)
// (4,4)

// 3 5
// 0 1 1 1 0
// 0 0 0 0 0
// 0 1 1 1 0

// 9 6
// 0 1 0 0 0 0
// 0 1 0 1 0 0
// 0 1 0 0 1 0
// 0 1 1 0 1 0
// 0 0 1 0 1 0
// 0 1 1 0 1 0
// 0 0 0 0 1 0
// 0 1 1 1 1 0
// 0 0 0 0 1 0

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  const inputs = [];
  while ((line = await readline())) {
    inputs.push(line.split(" "));
  }
  const map = inputs.slice(1);
  console.log(map);

  const paths = [[0, 0]];
  const errPaths = [];
  // let i = 0;
  go([0, 0], [map[0].length - 1, map.length - 1], paths);

  console.log("程序结束");
  console.log(paths);

  function go(start = [], end = [], paths = []) {
    const [startX, startY] = start;

    // if (i++ > 20) return true;

    console.log("\n", startX, startY);
    console.log("paths", paths);
    console.log("errPaths", errPaths);

    // 走到了终点
    if (startX === end[0] && startY === end[1]) {
      console.log("走到了终点");
      return true;
    }

    // 出界
    if (isOut(startX, startY)) {
      console.log("出界");
      return false;
    }

    // 碰到了墙
    if (map[startY][startX] === "1") {
      console.log("碰到了墙");
      return false;
    }

    // 前一步从这过来的
    const form = paths[paths.length - 3] || []
    if (form[0] === startX && form[1] === startY) {
      console.log('前一步从这过来的')
      return false
    }

    // 这条路在历史路径中标记
    if (errPaths.find((item) => item[0] === startX && item[1] === startY)) {
      console.log("这条路在历史路径中标记");
      return false;
    }

    // 继续走
    // 往下走
    console.log("往下走");
    paths.push([startX, startY + 1]);
    const down = go([startX, startY + 1], end, paths);
    if (down) {
      return true;
    } else {
      deletePath([startX, startY + 1]);
      console.log("往右走");
      // 往右走
      paths.push([startX + 1, startY]);
      const right = go([startX + 1, startY], end, paths);
      if (right) {
        return true;
      } else {
        deletePath([startX + 1, startY]);

        console.log("往上走");
        paths.push([startX, startY - 1]);
        const top = go([startX, startY - 1], end, paths);
        // 往上走
        if (top) {
          return true;
        } else {
          deletePath([startX, startY - 1]);

          // 往左走
          console.log("往左走");
          paths.push([startX - 1, startY]);
          const left = go([startX - 1, startY], end, paths);
          if (left) {
            return true;
          } else {
            deletePath([startX - 1, startY]);

            console.log("四个方向都不可走");
            // 这时候相当于四个方向全都不可走，则这个点不可走
            errPaths.push([startX, startY]);

            return false;
          }
        }
      }
    }
  }

  function isOut(startX, startY) {
    if (startX < 0 || startX >= map[0].length) return true;
    if (startY < 0 || startY >= map.length) return true;
    return false;
  }

  function deletePath([x, y]) {
    let index = -1;

    // 从后面往前找，删除最近的那个
    for (let i = paths.length - 1; i >= 0; i--) {
      if (paths[i][0] === x && paths[i][1] === y) {
        index = i;
        break;
      }
    }

    if (index) {
      paths.splice(index, 1);
    }
  }
})();
