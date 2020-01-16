#!/usr/bin/env node
var fs = require("fs");
var child_process = require('child_process');

var inquirer = require('inquirer');
require('shelljs/global');

const { projectPath } = require('./config');
const {
    ruleFile,
    TYPE_COVER_NOSAVE,
    TYPE_COVER_SAVE,
    TYPE_OUTPUT
} = require("./ruleFile");
const { rProcess } = require("./rProcess");
const { audioReName } = require('./scripts/audioReName/audioReName')


const targetDirPath = `${projectPath}sheet`;
const outputDir = process.argv[2] || 'output';
const targetFile = 'data.js';
const inputDir = 'input';
const inputDirPath = `${targetDirPath}/${inputDir}`;

const watchFileChoices = [
    {
        name: 'audio rename',
        callback: audioReName.bind(this, '/Users/zzb/work/txbstyle/RN_chinese/ReactNative/sheet/audio')
    },
    {
        name: 'watchFile by input',
        callback: () => {
            const _targetDirPath = `${targetDirPath}/${inputDir}`;
            watchThenRuleFile({
                target: _targetDirPath,
                ruleFile_targetDirPath: _targetDirPath,
                ruleFile_outputDir: '../',
            })
        }
    },
    {
        name: 'create input according to data.js',
        callback: () => {
            if (!fs.existsSync()) {
                // to do use -p
                mkdir(inputDirPath)
            }
            cp('-Rf', `${targetDirPath}/${targetFile}`, inputDirPath)
        }
    },
    {
        name: 'Restore data.js according to input',
        callback: () => {
            cp('-Rf', `${inputDirPath}/${targetFile}`, `${targetDirPath}/${targetFile}`)
        }
    },
    {
        name: 'watchFile by output',
        callback: () => {
            watchThenRuleFile({
                target: targetDirPath,
                ruleFile_targetDirPath: targetDirPath,
                ruleFile_outputDir: outputDir,
            })
        }
    },
    {
        name: 'watch and replace images for Photoshop slice',
        callback: () => {
            const questions = [
                {
                    type: 'input',
                    name: 'targetDir',
                    message: "Please enter the folder you want to watch"
                },
            ];

            inquirer.prompt(questions).then(answers => {
                const { targetDir } = answers;
                const watchDirPath = `${projectPath}sheet/images/${targetDir}`;     // 观察文件夹路径
                const watchImagesDirPath = `${watchDirPath}/images`;                // Photoshop导出文件夹路径

                if (!fs.existsSync(watchDirPath)) {
                    console.log(`文件夹${watchDirPath}不存在`)
                    return;
                }

                console.log('watch start');
                if (!fs.existsSync(watchImagesDirPath)) {
                    console.log(`mkdir ${watchImagesDirPath}`)
                    mkdir(watchImagesDirPath)
                }
                fs.watch(watchImagesDirPath, (eventType, filename) => {
                    if (
                        filename !== '.DS_Store' &&
                        eventType === 'rename' &&
                        filename.includes('_') &&
                        (filename.slice(-4) === '.jpg' || filename.slice(-4) === '.png')
                    ) {
                        const mvTarget = `${watchImagesDirPath}/${filename}`;
                        if (fs.existsSync(mvTarget)) {
                            const mvOutput = `${watchDirPath}/${filename.replace(/\_([\s\S])./, '')}`;
                            mv('-f', mvTarget, mvOutput);
                            console.log(`mv ${mvTarget} -> ${mvOutput} success`);
                        }
                    }
                });
            });
        }
    }
];
const ruleTypeChoices = [
    // new inquirer.Separator(),
    // new inquirer.Separator(),
    {
        name: 'Watch file',
        callback: inquirerAfter('Watch file', watchFileChoices),
    },
    {
        name: 'Do not covered and save the new file',
        callback: ruleFileBytype.bind(this, { type: TYPE_OUTPUT })
    },
    {
        name: 'Covered and save the original file',
        callback: ruleFileBytype.bind(this, { type: TYPE_COVER_SAVE })
    },
    {
        name: 'Directly covered',
        callback: ruleFileBytype.bind(this, { type: TYPE_COVER_NOSAVE })
    },
    {
        name: 'Clear output & input',
        callback() {
            rm('-rf', `${targetDirPath}/${outputDir}`, `${targetDirPath}/${inputDir}`)
        }
    },
    {
        name: 'Replace the progress bar',
        callback: rProcess.bind(this, {
            processResourcesPath: '/Users/zzb/work/新进度条/',
            outputDirPath: targetDirPath + '/images/process/'
        })
    },
];
const widgetChoices = [
    {
        name: 'arr mkdir',
        callback() {
            const questions = [
                {
                    type: 'input',
                    name: 'arrMkdir',
                    message: "Enter a prefix and an array, such as: g1e 1-10"
                },
            ];

            inquirer.prompt(questions).then(answers => {
                let { arrMkdir } = answers;
                arrMkdir = arrMkdir.split(' ');

                let result = [];
                const prefix = arrMkdir[0];
                const min = arrMkdir[1].split('-')[0];
                const max = arrMkdir[1].split('-')[1];
                const targetPath = '/Users/zzb/work/txbstyle/RN_chinese/ReactNative/sheet/images/';

                for (let i = min; i <= max; i++) {
                    result.push(`${targetPath}${prefix}${i}`);
                    console.log(`${prefix}${i}`)
                }

                mkdir(result)
            })
        }
    },
    {
        name: 'cdn url',
        callback() {
            echo('http://cdn2.txbimg.com/video/2019/07/041018_5d1d61f7bf35a.zip')
        }
    },
];
const scriptChoices = [
    {
        name: 'rzip by s045 AI动画课',
        callback: newRuhuaScript.bind(this, { name: 's45_rn_package_name', loadType: 5, ruhuaScirpt: 'scripts/afterZip/ENrzip.js', ScriptParam: ['/Users/zzb/work/qingke_rn/common_template/s045/ReactNative/'] })
    },
    {
        name: 'rzip by s038 AI伪直播',
        callback: newRuhuaScript.bind(this, { name: 's38_rn_package_name', loadType: 3, ruhuaScirpt: 'scripts/afterZip/ENrzip.js', ScriptParam: ['/Users/zzb/work/qingke_rn/common_template/s038/ReactNative/'] })
    },
    {
        name: 'rzip by s042 练习场',
        callback: newRuhuaScript.bind(this, { name: 's42_rn_package_name', loadType: 4, ruhuaScirpt: 'scripts/afterZip/ENrzip.js', ScriptParam: ['/Users/zzb/work/qingke_rn/common_template/s042/ReactNative/'] })
    },
    {
        name: 'rzip by s026 AI直播课',
        callback: newRuhuaScript.bind(this, { name: 's26_rn_package_name', loadType: 2, ruhuaScirpt: 'scripts/afterZip/ENrzip.js', ScriptParam: ['/Users/zzb/work/qingke_rn/common_template/s026/ReactNative/'] })
    },
    {
        name: 'rzip by s024 专题课',
        callback: newRuhuaScript.bind(this, { name: 's24_rn_package_name', loadType: 1, ruhuaScirpt: 'scripts/afterZip/ENrzip.js', ScriptParam: ['/Users/zzb/work/qingke_rn/common_template/s024/ReactNative/'] })
    },
    {
        name: 'rzip by chinese',
        callback: createChildrenProcessBySpawn.bind(this, 'sh', [`${__dirname}/rzip.sh`], () => {
            createChildrenProcessBySpawn('sh', [`${__dirname}/scripts/ruhuaUpdateZip/ruhuaUpdateZip.sh`])
        })
    },
    {
        name: 'ruleFile',
        callback: inquirerAfter('ruleFile', ruleTypeChoices)
    },
    {
        name: 'widget',
        callback: inquirerAfter('widget', widgetChoices)
    },
    // {
    //     name: 'ruhuarn',
    //     disabled: 'Temporary does not support',
    //     callback: () => {
    //         // to do use createChildrenProcessBySpawn
    //         // createChildrenProcessBySpawn('sh', [`${__dirname}/ruhuarn.sh`]);
    //         child_process.exec(`sh ${__dirname}/ruhuarn.sh`,
    //             function (err, stdout, stderr) {
    //                 if (err) { throw err; }
    //                 console.log(stdout);
    //             }
    //         );
    //     }
    // },
];

inquirer.prompt([
    {
        type: 'list',
        name: 'script',
        message: 'Please select a script',
        choices: scriptChoices,
    },
    {
        type: 'list',
        name: 'ruleFile',
        message: 'Which type do you want to choose?',
        choices: ruleTypeChoices,
        when (answers) {
            return answers.script === 'ruleFile';
        }
    },
    {
        type: 'list',
        name: 'Watch file',
        message: 'What kind of watch should you choose?',
        choices: watchFileChoices,
        when (answers) {
            return answers.ruleFile === 'Watch file';
        }
    },
    {
        type: 'list',
        name: 'widget',
        message: 'Select the widget you want',
        choices: widgetChoices,
        when (answers) {
            return answers.script === 'widget';
        }
    },
]).then(inquirerAfter('script', scriptChoices));

function inquirerAfter(key, choices) {
    return function (answers) {
        choices
            .find(({ name }) => name === answers[key])
            .callback(answers);
    }
}

function ruleFileBytype({
    type,
    targetDirPath: _targetDirPath = targetDirPath,
    outputDir: _outputDir = outputDir,
    isNeedclearCache = false
}) {
    ruleFile({
        type,
        targetDirPath: _targetDirPath,
        targetFile,
        outputDir: _outputDir,
        outputFile: targetFile,
        isNeedclearCache
    });
}

function createChildrenProcessBySpawn(p1, p2, cb) {
    const { spawn } = child_process;
    const child = spawn(p1, p2);

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
        process.stdout.write(data)
    })
    child.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    child.on('close', (code) => {
        // console.log(`child process exited with code ${code}`);
        if (typeof cb === 'function') {
            console.log(`\ncb in`);
            cb();
        }
    });
}

function watchThenRuleFile({
    target,
    ruleFile_targetDirPath = targetDirPath,
    ruleFile_outputDir = outputDir
}) {
    update();
    fs.watch(target, (eventType, filename) => {
        if (filename === targetFile) {
            console.log(`事件类型是: ${eventType}`);
            update()
        }
    });

    function update() {
        ruleFileBytype({
            type: TYPE_OUTPUT,
            targetDirPath: ruleFile_targetDirPath,
            outputDir: ruleFile_outputDir,
            isNeedclearCache: true
        })
    }
}

// 新版本ruhua上传脚本 输入名字 压缩 上传
function newRuhuaScript({
    name,
    loadType,       // 1 s24-专题课 | 2 s26-AI直播课 | 3 s38-AI直播 | 4 s42-练习场 | 5 s45-AI动画课
    ruhuaScirpt,
    ScriptParam = []
}) {
    inquirer.prompt([{
        type: 'input',
        name,
        message: "input rn package name"
    }]).then(answers => {
        let packageName = answers[name];

        if (packageName.includes(' ')) {
            packageName = packageName.replace(/ /g, '-')
        }

        console.log('rn package name', packageName)

        createChildrenProcessBySpawn('node', [`${__dirname}/${ruhuaScirpt}`, ...ScriptParam], () => {
            createChildrenProcessBySpawn('sh', [`${__dirname}/newruhuarn.sh`, packageName, loadType])
        })
    });
}