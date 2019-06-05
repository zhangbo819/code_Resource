var fs = require('fs');
var readline = require('readline');

var archiver = require('archiver');
require('shelljs/global');

var out = process.stdout;

// // test
// createGzipByPromise({
//     filePath: __dirname,
//     outputPath: __dirname + '/output.zip',
//     fileList: [{ path: '/input.txt' }, { path: '/src', directory: true }]
// })


function createGzipByPromise({ filePath, outputPath, fileList }) {
    return new Promise((resolve, reject) => {

        var stream = fs.createWriteStream(outputPath);
        var archive = archiver('zip');
        let status = true;
        var passedLength = 0;

        stream.on('close', function () {
            // console.log('archiver has been finalized and the output file descriptor has closed.');
            out.write(`\n压缩成功, 大小: ${(archive.pointer() / 1000 / 1000).toFixed(1)} MB, 压缩包路径: ${outputPath}\n`);
            // clearInterval(timer);
            resolve(true)
        });

        archive.on('data', function (chunk) {
            passedLength += chunk.length;
            readline.cursorTo(process.stdout, 0);
            out.write(`正在压缩, 已压缩: ${(passedLength / 1000 / 1000).toFixed(1)} MB`)
            // console.log('data', JSON.stringify(data))
        });

        archive.on('error', function (err) {
            console.warn(err)
            resolve(false)
            throw err;
        });

        // to do pipe use console
        archive.pipe(stream);

        const filePathLs = ls(filePath);
        fileList.forEach(({ path, directory = false }) => {
            if (!status) { return; }

            if (path.includes('\/')) {
                if (path[0] === '\/') {
                    targetItem = path.slice(1).split('\/')[0];
                } else {
                    targetItem = path.split('\/')[0];
                }
            } else {
                targetItem = path;
            }

            if (filePathLs.includes(targetItem)) {
                directory ?
                    archive.directory(filePath + path, path) :
                    archive.append(fs.createReadStream(filePath + path), { name: path })
            } else {
                console.warn(`Error: 文件${filePath + path}不存在`)
                status = false;
                resolve(false);
            }
        });

        // 开始压缩
        status && archive.finalize();

        // var timer = setInterval(() => {
        //     console.log('passedLength', passedLength)
        // }, 1000)
    })
}

module.exports = {
    createGzipByPromise
}
