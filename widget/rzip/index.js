#!/usr/bin/env node

const fs = require("fs");

const inquirer = require("inquirer");
const BottomBar = require('inquirer/lib/ui/bottom-bar');
const shell = require('shelljs');

const zip = require("../../Node/zip_test/zip");
let outputVersion = require("./outputVersion.json");

// 异步读取
console.log('rzip start')

const filePath = '/Users/zzb/work/txbstyle/RN_chinese/ReactNative/';
const targetPath = filePath + 'sheet/data.js';
const questions = [
    {
        type: 'input',
        name: 'inputZipName',
        message: "请输入压缩包前缀名称(课程名称)"
    },
];




main();

async function main() {
    const { inputZipName } = await inquirer.prompt(questions);
    // console.log('inputZipName', inputZipName)

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

        const changeData = json_data;

        const res = await writeFileByPromise({ data: changeData, targetPath });
        console.log(`替换删除写入${res ? '成功' : '失败'}`);
        if (!res) return;

        console.log('开始压缩');

        let now = new Date();
        now = now.getFullYear() + fillZero(now.getMonth() + 1) + fillZero(now.getDate());
        const zipOutputNameHalf = `${inputZipName || ''}-${now}`;
        let versionNum = outputVersion[zipOutputNameHalf];

        if (versionNum === undefined) {
            versionNum = 1;
        } else {
            versionNum++;
        }
        console.log(`${zipOutputNameHalf} ${versionNum}`);
        outputVersion[zipOutputNameHalf] = versionNum;

        outputVersion = JSON.stringify(outputVersion, null, 4);
        // to do mkdir & git rm
        const outputNameRes = await writeFileByPromise({ data: outputVersion, targetPath: __dirname + "/outputVersion.json" });
        console.log(`版本更新${outputNameRes ? '成功' : '失败'}`)

        // loading start
        const loader = ['/ Installing', '| Installing', '\\ Installing', '- Installing'];
        let i = 4;
        const ui = new BottomBar({ bottomBar: loader[i % 4] });
        const timer = setInterval(() => {
            ui.updateBottomBar(loader[i++ % 4]);
        }, 150);

        const zipRes = await zip.createGzipByPromise({
            filePath,
            outputPath: `${filePath}${zipOutputNameHalf}-v${versionNum}.zip`,
            fileList: [
                { path: 'package.json' },
                { path: 'index.js' },
                { path: 'node_modules', directory: true },
                { path: 'sheet', directory: true },
                { path: 'src', directory: true }
            ]
        })

        // loading end
        clearInterval(timer);
        // ui.updateBottomBar('Installation done!\n');

        if (!zipRes) {
            console.log('文件压缩失败')
        }

        console.log(`开始复原 ${targetPath}`);
        const recoverRes = await writeFileByPromise({ data: json_data_original, targetPath });
        console.log(`文件 ${targetPath} 恢复${recoverRes ? '成功' : '失败'}`);
        shell.exit(recoverRes ? 1 : 0)
    });
}

function writeFileByPromise({ targetPath, data }) {
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

function fillZero(num) {
    if (num > 0 && num < 10) {
        num = '0' + num;
    }
    return num.toString()
}



