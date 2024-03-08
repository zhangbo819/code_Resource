// 找出’fdakjlkeiytabcdefghijklmnopqrstuirwhd’里出现最长的没有重复字符的子串

function fn(str = "") {
  const res = [];

  for (let i = 0; i < str.length; i++) {
    let target = str[i];

    for (let j = i + 1; j < str.length - 1; j++) {
      if (!target.includes(str[j])) {
        target += str[j];
      } else {
        res.push(target);
        target = "";
      }
    }
  }

  const max = res.reduce((r, i) => {
    if (i.length > r.length) {
      r = i;
    }
    return r;
  }, '');

  return max;
}

console.log(fn("fdakjlkeiytabcdefghijklmnopqrstuirwhd"));
