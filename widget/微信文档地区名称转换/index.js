const fs = require('fs');

fs.readFile('./a.txt', 'utf-8', (err, res) => {
  res = res.replace(/[^\u4e00-\u9fa5|,| ]+/ig, '') // 过滤非汉字
    .replace(/   |  /ig, ',') // 过滤空格
    .split(',') // 按，分割
    .reduce((r, i) => { // 去掉汉字中国 和 空元素
      if (i !== '') {
        r.push(i.replace('中国 ', '').replace(/^ /, ''))
      }
      return r
    }, [])
    .reduce((r, i) => {
      const [province, city] = i.split(' ');
      if (r[province]) {
        r[province].push(city)
      } else {
        // 首次进入
        r[province] = [city];
      }
      return r
    }, {})

  // 生成element ui 需要的option格式
  const element_option = [];

  for (let key in res) {
    const item = res[key];

    element_option.push({
      value: key,
      label: key,
      children: item.map(i => {
        if (!i) {
          i = 'None';
        }
        return {
          value: i,
          label: i
        }
      })
    })
  }

  console.log(element_option)

  // return
  fs.writeFile('./wxData.json', JSON.stringify(element_option, null, 4), err => {
    if (err) {
      console.error(err)
      return
    }
    //文件写入成功。
  })

})