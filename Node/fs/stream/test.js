var fs = require('fs'),
    path = require('path'),
    out = process.stdout;

var filePath = '/Users/zhangbo/Downloads/android-studio-ide-173.4819257-mac.dmg';
var output = 'output/file.dmg';

var readStream = fs.createReadStream(filePath);
var writeStream = fs.createWriteStream(output);

var stat = fs.statSync(filePath);

var totalSize = stat.size;
var passedLength = 0;
var lastSize = 0;
var startTime = Date.now();


// to do use pipe
// readStream.pipe(writeStream);

readStream.on('data', function (chunk) {

    passedLength += chunk.length;

    if (writeStream.write(chunk) === false) {
        // console.log('暂停')
        readStream.pause();
    }
});

readStream.on('end', function () {
    writeStream.end();
});

writeStream.on('drain', function () {
    readStream.resume();
});

setTimeout(function show() {
    var percent = Math.ceil((passedLength / totalSize) * 100);
    var size = Math.ceil(passedLength / 1000000);
    var diff = size - lastSize;
    lastSize = size;
    out.clearLine();
    out.cursorTo(0);
    out.write('已完成' + size + 'MB, ' + percent + '%, 速度：' + diff * 2 + 'MB/s');
    if (passedLength < totalSize) {
        setTimeout(show, 500);
    } else {
        var endTime = Date.now();
        console.log();
        console.log('共用时：' + (endTime - startTime) / 1000 + '秒。');
    }
}, 500);