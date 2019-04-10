var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var urlObj = url.parse(request.url);
        var pathname = urlObj.pathname;
        var query = urlObj.query;
        console.log("Request for " + pathname + " received." + " query: " + query);

        route(pathname, query, handle, response);
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server running at http://127.0.0.1:8888/");
}

exports.start = start;