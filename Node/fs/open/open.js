var fs = require("fs");
var buf = new Buffer.alloc(1024);

console.log("准备打开已存在的文件！");

fs.open('test.hhx', 'r+', function (err, fd) {
    if (err) {
        return console.error(err);
    }
    console.log("文件打开成功！");
    console.log("准备读取文件：");

    // 读
    // fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log(bytes + "  字节被读取");

    //     // 仅输出读取的字节
    //     if (bytes > 0) {
    //         console.log(buf.slice(0, bytes).toString());
    //     }

    //     // 关闭文件
    //     fs.close(fd, function (err) {
    //         if (err) {
    //             console.log(err);
    //         }
    //         console.log("文件关闭成功");
    //     });
    // });

    // 写
    var buffer = new Buffer.from('fs.write Buffer\n');

    fs.write(fd, buffer, 0, buffer.length, 0, function (err, bytesWritten, buffer) {
        if (err) {
            throw err;
        }

        console.log('write success.');
        // 打印出buffer中存入的数据
        console.log(bytesWritten, buffer.slice(0, bytesWritten).toString());

        // 关闭文件
        fs.close(fd, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("文件关闭成功");
        });
    });
});