#!/usr/bin/env node

const fs = require("fs");
const child_process = require('child_process');

// const inquirer = require("inquirer");
const BottomBar = require('inquirer/lib/ui/bottom-bar');
const shell = require('shelljs');

const zip = require("../../Node/zip_test/zip");
const { projectPath, STORAGE_KEY } = require('./config');
const { ruleFile, TYPE_COVER_NOSAVE } = require("./ruleFile");

const filePath = projectPath;
const targetFile = 'data.js';
const targetDirPath = `${projectPath}sheet`;
const targetFilePath = `${targetDirPath}/${targetFile}`;

const outputVersionDir = 'data';
const outputVersionJson = 'outputVersion.json';
// const questions = [
//     {
//         type: 'input',
//         name: 'inputZipName',
//         message: "请输入压缩包前缀名称(课程名称)"
//     },
// ];


// console.log('rzip start')
_main();

async function _main() {
    await _checkoutputVersion();
    const outputVersionPath = `${__dirname}/${outputVersionDir}/${outputVersionJson}`
    let outputVersion = require(outputVersionPath);

    const inputZipName = STORAGE_KEY;
    // const { inputZipName } = await inquirer.prompt(questions);
    // console.log('inputZipName', inputZipName)


    const { data_original } = await ruleFile({
        type: TYPE_COVER_NOSAVE,
        targetDirPath,
        targetFile,
        replaceAudio: true
    });

    // let now = new Date();
    // now = now.getFullYear() + _fillZero(now.getMonth() + 1) + _fillZero(now.getDate());
    // const zipOutputNameHalf = `${inputZipName || ''}-${now}`;

    // to do zipOutputNameHalf add -
    const zipOutputNameHalf = `${inputZipName || ''}`;
    let versionNum = outputVersion[zipOutputNameHalf];

    if (versionNum === undefined) {
        versionNum = 1;
    } else {
        versionNum++;
    }
    console.log(`${zipOutputNameHalf} ${versionNum}`);
    outputVersion[zipOutputNameHalf] = versionNum;

    outputVersion = JSON.stringify(outputVersion, null, 4);
    const outputNameRes = await _writeFileByPromise({ data: outputVersion, targetPath: outputVersionPath });
    console.log(`版本更新${outputNameRes ? '成功' : '失败'}`)

    console.log('开始压缩');
    // // loading start
    // const loader = ['/ Compressing files', '| Compressing files', '\\ Compressing files', '- Compressing files'];
    // let i = 4;
    // const ui = new BottomBar({ bottomBar: loader[i % 4] });
    // const timer = setInterval(() => {
    //     ui.updateBottomBar(loader[i++ % 4]);
    // }, 150);

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

    // // loading end
    // clearInterval(timer);
    // // ui.updateBottomBar('Installation done!\n');

    if (!zipRes) {
        console.log('文件压缩失败')
    }

    console.log(`开始复原文件 ${targetFilePath}`);
    const recoverRes = await _writeFileByPromise({ data: data_original, targetPath: targetFilePath });
    console.log(`复原${recoverRes ? '成功' : '失败'}`);

    // child_process.exec(`open ${filePath}`, function (err, stdout, stderr) {
    //     console.log(err, stdout, stderr);
    //     if (err) throw err;

    //     shell.exit(recoverRes ? 0 : 1)
    // });
}

function _writeFileByPromise({ targetPath, data }) {
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

function _fillZero(num) {
    if (num > 0 && num < 10) {
        num = '0' + num;
    }
    return num.toString()
}

async function _checkoutputVersion() {
    if (!fs.existsSync(outputVersionDir)) {
        shell.mkdir(outputVersionDir)
    }

    if (!fs.existsSync(outputVersionDir + '/' + outputVersionJson)) {
        const res = await _writeFileByPromise({ targetPath: outputVersionJson, data: "{}" });
    }
}





