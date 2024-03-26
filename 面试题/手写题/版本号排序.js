// ['1.1.2' ,'2.112.13.4', '2.21.3']

function versionSort(arr = []) {
  const res = [...arr];
  for (let i = 0; i < res.length - 1; i++) {
    for (let j = i + 1; j < res.length; j++) {
      const result = Check(res[i], res[j]);
      console.log(res[i], res[j], result);
      if (result) {
        const step = res[i];
        res[i] = res[j];
        res[j] = step;
      }
    }
  }
  return res;
}

function Check(item, next) {
  item = item.split(".");
  next = next.split(".");

  let res = false;

  for (let i = 0; i < item.length - 1; i++) {
    if (Number(item[i]) > Number(next[i])) {
      res = true;
      break;
    }
  }

  return res;
}

console.log(versionSort(["1.1.2", "1.0.1", "2.112.13.4", "2.21.3"]));
