var fs = require("fs");
var http = require('http');

http.createServer(function (request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    // 发送响应数据 "Hello World"
    // response.end('Hello World\n');

    // 异步读取
    fs.readFile('data.js', async (err, data) => {
        if (err) {
            return console.error(err);
        }
        console.log("异步读取: " + data);

        response.end(data)

        console.log("准备写入文件");
        fs.writeFile('inputData.js', data, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("数据写入成功！");
            console.log("--------我是分割线-------------")
            console.log("读取写入的数据！");
            fs.readFile('inputData.js', function (err, data) {
                if (err) {
                    return console.error(err);
                }
                console.log("异步读取文件数据: " + data.toString());
            });
        });
    });
}).listen(8888);

// // 同步读取
// var data = fs.readFileSync('data.js');
// console.log("同步读取: " + data);

// console.log("程序执行完毕。");

