var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {
    "/": requestHandlers.hello,
    "/get": requestHandlers.get
};

server.start(router.route, handle);