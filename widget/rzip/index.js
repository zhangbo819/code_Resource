#!/usr/bin/env node

const fs = require("fs");
var child_process = require('child_process');

// const inquirer = require("inquirer");
const BottomBar = require('inquirer/lib/ui/bottom-bar');
const shell = require('shelljs');

const zip = require("../../Node/zip_test/zip");
let outputVersion = require("./data/outputVersion.json");  // to do create
const { projectPath, STORAGE_KEY } = require('./config');

const filePath = projectPath;
const targetPath = filePath + 'sheet/data.js';
const questions = [
    {
        type: 'input',
        name: 'inputZipName',
        message: "请输入压缩包前缀名称(课程名称)"
    },
];


console.log('rzip start')
main();

async function main() {
    const inputZipName = STORAGE_KEY;
    // const { inputZipName } = await inquirer.prompt(questions);
    // console.log('inputZipName', inputZipName)


    const { res: ruleFileRes, data_original } = await ruleFile();

    console.log('开始压缩');

    // let now = new Date();
    // now = now.getFullYear() + fillZero(now.getMonth() + 1) + fillZero(now.getDate());
    // const zipOutputNameHalf = `${inputZipName || ''}-${now}`;
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
    const outputNameRes = await writeFileByPromise({ data: outputVersion, targetPath: __dirname + "/data/outputVersion.json" });
    console.log(`版本更新${outputNameRes ? '成功' : '失败'}`)

    // loading start
    const loader = ['/ Compressing files', '| Compressing files', '\\ Compressing files', '- Compressing files'];
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

    console.log(`开始复原文件 ${targetPath}`);
    const recoverRes = await writeFileByPromise({ data: data_original, targetPath });
    console.log(`复原${recoverRes ? '成功' : '失败'}`);

    child_process.exec(`open ${filePath}`, function (err, stdout, stderr) {
        console.log(err, stdout, stderr);
        if (err) throw err;

        shell.exit(recoverRes ? 0 : 1)
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

async function ruleFile() {

    let data = fs.readFileSync(targetPath);
    // console.log(`读取: ${targetPath} 成功`);

    const data_original = data.toString('utf8');

    const { rmodule, str } = exportToES5(data);

    data = (str + rmodule);

    // if (!ls().some(i => i === outputDir)) {
    //     mkdir(outputDir)
    // }
    // cd(outputDir)

    // appendFile
    await fs.writeFileSync(targetPath, data);

    const rData = require(targetPath);

    const changerData = 'export const sheetData = ' + JSON.stringify(rData.sheetData, null, 4);

    await fs.writeFileSync(targetPath, changerData);

    let outputrdata = await fs.readFileSync(targetPath);

    // require 还原
    outputrdata = outputrdata
        .toString('UTF-8')
        .replace(/\"require\([\s\S]+?\)\"/ig, (s) => {
            // console.log("last ssssssss", s.slice(1, -1))
            return s.slice(1, -1);
        });

    // 替换audio
    outputrdata = outputrdata.replace(/http\:\/\/test\.txbimg\.com\/RN_chinese\/ReactNative\/sheet\//ig, '');
    const res = await writeFileByPromise({ data: outputrdata, targetPath });
    console.log(`ruleFile ${res ? '成功' : '失败'}`);

    return { res, data_original };
}

function exportToES5(str = '') {
    let rmodule = '{';

    // 处理 require
    str = str.toString('UTF-8').replace(/require\([\s\S]+?\)/ig, (s) => {
        // console.log("first sssss", s)
        return `\"${s}\"`;
    });

    // to do function & 结构
    // 处理 module.exports
    // to do \];
    str = str.replace(/export const ([\s\S]+?)=([\s\S]+?)\];/ig, (all, $1, $2) => {
        // console.log("second ", $2)
        rmodule += `${$1}:${$2}]`;
        return '';
    });

    rmodule += "}";
    rmodule = 'module.exports = ' + rmodule;
    // console.log(str)
    return {
        rmodule,
        str
    }
}



