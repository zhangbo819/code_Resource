
require('shelljs/global');

const zip = require("../../../../Node/zip_test/zip");


main();


async function main() {

    const oldFilePath = '/Users/zzb/work/qingke_rn/common_template/TV/';
    // const oldFilePath = process.argv[2];

    const crnPath = '/Users/zzb/work/xcrn/';

    rm('-rf', crnPath + 'src')

    cp('-rf', oldFilePath + 'src', crnPath)

    const filePath = crnPath;

    const outputPath = `${filePath}item.zip`;

    await zip.createGzipByPromise({
        filePath,
        outputPath,
        fileList: [
            { path: 'package.json' },
            { path: 'index.js' },
            { path: 'node_modules', directory: true },
            { path: 'src', directory: true },
            { path: 'app.json' },
        ]
    })

    await mv('-f', outputPath, '/Users/zzb/work/rnapp/newtemplate')

    console.log('mv success')

}