#!/usr/bin/env node

const fs = require("fs");
const child_process = require('child_process');

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

// console.log('rzip start')
_main();

async function _main() {
    await _checkoutputVersion();
    const outputVersionPath = `${__dirname}/${outputVersionDir}/${outputVersionJson}`
    let outputVersion = require(outputVersionPath);

    const inputZipName = STORAGE_KEY;
    console.log('STORAGE_KEY', STORAGE_KEY)

    const { data_original } = await ruleFile({
        type: TYPE_COVER_NOSAVE,
        targetDirPath,
        targetFile,
        replaceAudio: true
    });

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

    const outputPath = `${filePath}${zipOutputNameHalf}-v${versionNum}.zip`;

    const zipRes = await zip.createGzipByPromise({
        filePath,
        outputPath,
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

    shell.mv('-f', outputPath, '/Users/zzb/work/rnapp/template/item.zip')

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

async function _checkoutputVersion() {
    if (!fs.existsSync(outputVersionDir)) {
        // to do use -p
        shell.mkdir(outputVersionDir)
    }

    if (!fs.existsSync(outputVersionDir + '/' + outputVersionJson)) {
        const res = await _writeFileByPromise({ targetPath: outputVersionJson, data: "{}" });
    }
}





