const Data = {
  group: [
    '火 土 风 水'.split(' '),
    '白羊 金牛 天秤 天蝎'.split(' '),
    '狮子 处女 水瓶 双鱼'.split(' '),
    '射手 摩羯 双子 巨蟹'.split(' '),
  ],
};

Data.group.forEach((arr, index) => {
  console.log("第" + (index + 1) + "组\n");
  echoGroup(arr);
//   console.log("\n");
});

function echoGroup(arr: string[]) {
  const empty = arr[0].split('').map(i => '  ').join('');
  console.log(`${empty}${arr[0]}${empty}\n`);
  console.log(`${arr[1]}${empty}${arr[3]}\n`);
  console.log(`${empty}${arr[2]}${empty}\n`);
}
