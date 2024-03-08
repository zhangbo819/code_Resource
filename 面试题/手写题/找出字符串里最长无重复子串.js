// 找出’fdakjlkeiytabcdefghijklmnopqrstuirwhd’里出现最长的没有重复字符的子串

function fn(str = "") {
  let res = ''

  for (let i = 0; i < str.length; i++) {
    let target = str[i];

    for (let j = i + 1; j < str.length - 1; j++) {
      if (!target.includes(str[j])) {
        target += str[j];
      } else {
        if (target.length > res.length) {
          res = target
        }
        target = "";
      }
    }
  }

  return res;
}

console.log(fn("fdakjlkeiytabcdefghijklmnopqrstuirwhd"));
