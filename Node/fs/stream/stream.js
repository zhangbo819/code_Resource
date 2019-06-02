var fs = require('fs');

var readStream = fs.createReadStream('./target.js')
var writeStream = fs.createWriteStream('./myFile.txt')

if (false) {
    // readStream.on('open', function (fd) {
    //     console.log('文件已打开');
    // });

    // readStream.on('data', function (chunk) { // 当有数据流出时，写入数据
    //     if (writeStream.write(chunk) === false) { // 如果没有写完，暂停读取流
    //         console.log('如果没有写完，暂停读取流')
    //         readStream.pause();
    //     }
    // });

    // writeStream.on('drain', function () { // 写完后，继续读取
    //     console.log('写完后，继续读取')
    //     readStream.resume();
    // });

    // readStream.on('end', function () { // 当没有数据时，关闭数据流
    //     console.log('当没有数据时，关闭数据流')
    //     writeStream.end();
    // });
} else {
    // 等价于上面的
    // pipe自动调用了data,end等事件
    readStream.pipe(writeStream);
}



