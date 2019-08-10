var http = require('http');
var url = require("url");


http.createServer(function (request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain

    var urlObj = url.parse(request.url);
    var pathname = urlObj.pathname;
    var query = urlObj.query;

    console.log("Request for " + pathname + " received." + " query: " + query);

    response.writeHead(200, { 'Content-Type': 'text/plain' });

    // 发送响应数据 "Hello World"
    response.write("Hello World\n");
    response.end();
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');