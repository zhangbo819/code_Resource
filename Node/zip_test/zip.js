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
            console.log(`\n压缩成功, 大小: ${(archive.pointer() / 1000 / 1000).toFixed(1)} MB, 压缩包路径: ${outputPath}`);
            resolve(true)
        });

        archive.on('error', function (err) {
            console.warn(err)
            resolve(false)
            throw err;
        });

        archive.pipe(output);

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
    })
}

// test
// createGzipByPromise({
//     filePath: __dirname,
//     outputPath: __dirname + '/output.zip',
//     fileList: [{ path: '/input.txt' }, { path: '/src', directory: true }]
// })

module.exports = {
    createGzipByPromise
}
