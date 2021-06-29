/*
** 自动找到csv文件，并且 并行的执行
*/
const fs = require('fs');
const { exec } = require('child_process');

const dir = './input/';

fs.readdir(dir, (err, res) => {
  if (err || !Array.isArray(res)) return
  // console.log(res)
  // 找到所有需要的文件
  const target_cwds = res.reduce((r, name) => {
    if (/input([\s\S]*)\.csv/ig.test(name)) {
      r.push('node ./index.js ' + dir + name)
    }
    return r
  }, [])
  console.log('target_cwds', target_cwds)

  // 多个文件并行
  exec(target_cwds.join('&'), (err, stdout, stderr) => {
    if (err) {
      console.log('exec err', err)
      return
    }
    if (stderr) {
      console.log('stderr: ', stderr)
      return
    }
    console.log('stdout: ', stdout)
  })
})