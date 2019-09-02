var http = require('http');
var url = require("url");
var fs = require('fs');


http.createServer(function (request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain

    var { pathname, query } = url.parse(request.url);

    console.log("Request for " + pathname + " received." + " query: " + query);

    // response.writeHead(200, { 'Content-Type': 'text/plain' });

    download(query, response)

    // 发送响应数据 "Hello World"
    // response.write("Hello World\n");
    // response.end();
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');



function download(query, res) {
    console.log('download start')

    const fileName = 'test.zip';

    fs.readFile(`./${fileName}`, function (isErr, data) {
        if (isErr) {
            res.end("Read file failed!");
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'application/octet-stream', // 告诉浏览器这是一个二进制文件  
            'Content-Disposition': 'attachment; filename=' + fileName, // 告诉浏览器这是一个需要下载的文件  
        });
        res.end(data)
        console.log('download over')
    })
}