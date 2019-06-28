var querystring = require("querystring");
var fs = require("fs");

const assets = "./images/test.png";

function getText(response) {
    var text = "Winnie the Witch";
    console.log(text);
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(text);
    response.end();
}

function getImage(response) {
    console.log("getImage");
    fs.readFile(assets, "binary", function (error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "image/jpg" });
            response.write(file, "binary");
            response.end();
        }
    });
}

function getBigImage(response) {
    console.log("getBigImage");
    fs.readFile(assets, "binary", function (error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "image/jpg" });
            response.write(file, "binary");
            response.end();
        }
    });
}

function get(query, response) {
    console.log("query: " + query);
    var queryObj = querystring.parse(query);
    for (key in queryObj) {
        console.log("key: " + key + ", value: " + queryObj[key]);
    }
    var type = queryObj["type"];
    switch (type) {
        case "text":
            getText(response);
            break;

        case "image":
            getImage(response);
            break;

        case "bigimage":
            getBigImage(response);
            break;

        default:
            var text = "type " + type + " is unknown.";
            console.log(text);
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(text);
            response.end();
            break;
    }
}

function hello(query, response) {
    console.log("Hello World");
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World");
    response.end();
}

function index(query, response) {
    fs.readFile('./index.html', function (err, html) {
        if (err) {
            throw err;
        }
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(html);
        response.end();
    });
}

function download(query, res) {
    console.log('download start')

    // const fileName = 'a.apk';
    const fileName = 'test.png';

    fs.readFile(`./images/${fileName}`, function (isErr, data) {
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

exports.get = get;
exports.hello = hello;
exports.index = index;
exports.download = download;