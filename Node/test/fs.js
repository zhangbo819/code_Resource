var fs = require("fs");

// 异步读取1
console.log('fs start')
const data = require('./data');

const changeData = 'export const sheetData = ' + JSON.stringify(data, null, '    ');

fs.writeFile('inputData.js', changeData, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log("数据写入成功！");
});

// fs.readFile('data.js', async (err, data) => {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("异步读取: " + data);

//     console.log("准备写入文件");

// });

// // 同步读取
// var data = fs.readFileSync('data.js');
// console.log("同步读取: " + data);

// console.log("程序执行完毕。");

