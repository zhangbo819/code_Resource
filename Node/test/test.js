var fs = require("fs");

const targetFile = 'data.js';

main();

async function main() {
    // 同步读取
    let data = await fs.readFileSync(targetFile);

    data = data.toString('UTF-8');

    console.log("同步读取: ", data);


    data = data.replace(/^require\(([*]?)\)$/ig, (s) => {
        console.log("ssssssss", s)
    });


    // appendFile
    let res = await fs.writeFileSync('inputData.js', data);

    console.log(res)
}


// fs.writeFile('inputData.js', changeData, function (err) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("数据写入成功！");
// });

// fs.readFile('data.js', async (err, data) => {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("异步读取: " + data);

//     console.log("准备写入文件");

// });


