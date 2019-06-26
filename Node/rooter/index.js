var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {
    "/": requestHandlers.index,
    "/hello": requestHandlers.hello,
    "/get": requestHandlers.get,
    "/download": requestHandlers.download,
};

server.start(router.route, handle);