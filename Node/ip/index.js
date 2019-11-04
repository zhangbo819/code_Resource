var http = require('http')
var ip = require('./ip')();
var port = 8888;

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.write('Hello World\n')
    response.end()
}).listen(port)

console.log(`Server running at http://${ip}:${port}`)
