var http = require("http");
var url = require("url");

function start(route) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        route(pathname)
        // console.log("Request for " + pathname + " received.");
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("Hello World " + pathname);
        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started. http://127.0.0.1:8888/");
}

exports.start = start;