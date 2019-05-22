var fs = require('fs');
var archiver = require('archiver');

const createGzip = ({ filePath, outputPath, fileList }) => {
    var output = fs.createWriteStream(outputPath);
    var archive = archiver('zip');

    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    archive.on('error', function (err) {
        console.warn(err)
        throw err;
    });

    archive.pipe(output);

    fileList.forEach(item => {
        archive.append(fs.createReadStream(filePath + item), { name: item })
    });

    // 开始压缩
    archive.finalize();
}

createGzip({
    filePath: __dirname,
    outputPath: __dirname + '/output.zip',
    fileList: ['/input.txt', '/input1.txt']
})

module.exports = {
    createGzip
}
