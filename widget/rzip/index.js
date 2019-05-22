#!/usr/bin/env node

const fs = require("fs");

const zip = require("../../Node/zip_test/zip");

// 异步读取
console.log('rzip start')

const targetPath = '/Users/zzb/work/txbstyle/RN_chinese/ReactNative/sheet/data.js';
// const targetPath = 'data_bak.js';

const writeFileByPromise = ({ targetPath, data }) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(targetPath, data, function (err) {
            if (err) {
                console.error(err);
                resolve(false)
            }
            resolve(true);
        })
    });
}

const fillZero = (num) => {
    if (num > 0 && num < 10) {
        num = '0' + num;
    }
    return num.toString()
}

fs.readFile(targetPath, async (err, data) => {
    if (err) {
        return console.error(err);
    }
    console.log(`异步读取: ${targetPath} 成功`);

    // console.log('data: ', data)

    // const json_data_original = JSON.stringify(data);
    const json_data_original = data.toString('utf8');
    // console.log('json_data_original', json_data_original)
    const json_data = json_data_original.replace(/http\:\/\/test\.txbimg\.com\/RN_chinese\/ReactNative\/sheet\//ig, '');

    // console.log('json_data', json_data)

    // const changeData = 'export const sheetData = ' + json_data;
    const changeData = json_data;

    const res = await writeFileByPromise({ data: changeData, targetPath });
    console.log(`替换删除写入${res ? '成功' : '失败'}`);
    if (!res) return;

    console.log('开始压缩');

    let now = new Date();
    now = now.getFullYear() + fillZero(now.getMonth() + 1) + fillZero(now.getDate());

    const zipRes = await zip.createGzipByPromise({
        filePath: '/Users/zzb/work/txbstyle/RN_chinese/ReactNative/',
        outputPath: `/Users/zzb/work/txbstyle/RN_chinese/ReactNative/${process.argv[2] || ''}-${now}-v${process.argv[3] || ''}.zip`,
        fileList: [
            { path: 'package.json' },
            { path: 'index.js' },
            { path: 'node_modules', directory: true },
            { path: 'sheet', directory: true },
            { path: 'src', directory: true }
        ]
    })
    if (!zipRes) {
        console.log('文件压缩失败')
    }

    console.log(`开始复原 ${targetPath}`);
    const recoverRes = await writeFileByPromise({ data: json_data_original, targetPath });
    console.log(`文件 ${targetPath} 恢复${recoverRes ? '成功' : '失败'}`);
});

