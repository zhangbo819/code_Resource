var fs = require('fs');

var archiver = require('archiver');
require('shelljs/global');


const createGzipByPromise = ({ filePath, outputPath, fileList }) => {
    return new Promise((resolve, reject) => {

        var output = fs.createWriteStream(outputPath);
        var archive = archiver('zip');
        let status = true;

        output.on('close', function () {
            // console.log('archiver has been finalized and the output file descriptor has closed.');
            console.log(`压缩成功, 大小: ${archive.pointer()} 字节, 压缩包路径: ${outputPath}`);
            resolve(true)
        });

        archive.on('error', function (err) {
            console.warn(err)
            resolve(false)
            throw err;
        });

        archive.pipe(output);

        const filePathLs = ls(filePath);
        fileList.forEach(item => {
            if (!status) { return; }

            if (item.includes('\/')) {
                if (item[0] === '\/') {
                    targetItem = item.slice(1).split('\/')[0];
                } else {
                    targetItem = item.split('\/')[0];
                }
            } else {
                targetItem = item;
            }

            if (filePathLs.includes(targetItem)) {
                archive.append(fs.createReadStream(filePath + item), { name: item })
            } else {
                console.warn(`Error: 文件${filePath + item}不存在`)
                status = false;
                resolve(false);
            }
        });

        // 开始压缩
        status && archive.finalize();
    })
}

// test
createGzipByPromise({
    filePath: __dirname,
    outputPath: __dirname + '/output.zip',
    fileList: ['/input.txt', '/src/input1.txt']
})

module.exports = {
    createGzipByPromise
}
