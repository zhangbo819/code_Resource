
const fs = require("fs");

const inquirer = require("inquirer");
require('shelljs/global');

const zip = require("../../../../Node/zip_test/zip");

const version_json_path = __dirname + '/../../data/ENVersion.json';
if (!fs.existsSync(version_json_path)) {
    fs.writeFileSync(version_json_path, "{}", function (e) {
        if (e) {
            console.error(e)
        }
    })
}



main();


// todo merge
async function main() {
    const questions = [
        {
            type: 'input',
            name: 'inputZipName',
            message: "请输入压缩包前缀名称(课程名称)"
        }
    ];

    const outputVersion = require(version_json_path);

    // const filePath = '/Users/zzb/work/qingke_rn/common_template/s038/ReactNative/';
    
    const filePath = process.argv[2];

    // inquirer.prompt(questions).then(e => { console.log(e) });   // todo use input

    // const { inputZipName = 'NEW-EN' } = {};

    // let now = new Date();
    // now = now.getFullYear() + _fillZero(now.getMonth() + 1) + _fillZero(now.getDate());
    // const zipOutputNameHalf = `${inputZipName ? (inputZipName + '-') : ''}${now}`;

    // let versionNum = outputVersion[zipOutputNameHalf] || 0;

    // outputVersion[zipOutputNameHalf] = ++versionNum;

    // fs.writeFile(version_json_path, JSON.stringify(outputVersion, null, 4), function () { })

    const outputPath = `${filePath}item.zip`;

    await zip.createGzipByPromise({
        filePath,
        outputPath,
        fileList: [
            { path: 'package.json' },
            { path: 'index.js' },
            { path: 'node_modules', directory: true },
            { path: 'src', directory: true },
            { path: 'devData.js', isRequired: false }
        ]
    })

    await mv('-f', outputPath, '/Users/zzb/work/rnapp/template')

    console.log('mv success')

    // todo sh newruhuarn.sh
}

function _fillZero(num) {
    if (num > 0 && num < 10) {
        num = '0' + num;
    }
    return num.toString()
}