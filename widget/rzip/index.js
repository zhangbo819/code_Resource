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


const ruleTypeChoices = [
    // new inquirer.Separator(),
    // new inquirer.Separator(),
    {
        name: 'Do not covered and save the new file',
        callback: () => {
            ruleFileBytype({ type: TYPE_OUTPUT })
        }
    },
    {
        name: 'Covered and save the original file',
        callback: () => {
            ruleFileBytype({ type: TYPE_COVER_SAVE })
        }
    },
    {
        name: 'Directly covered',
        callback: () => {
            ruleFileBytype({ type: TYPE_COVER_NOSAVE })
        }
    },
    {
        name: 'Watch targetFile',
        callback: () => {
            fs.watch(targetDirPath, (eventType, filename) => {
                if (filename === targetFile) {
                    console.log(`事件类型是: ${eventType}`);
                    ruleFileStart({ type: TYPE_OUTPUT, isNeedclearCache: true })
                }
            });
        }
    },
    {
        name: 'Clear output',
        callback: () => {
            rm('-rf', `${targetDirPath}/${outputDir}`);
        }
    },
    {
        name: 'Replace the progress bar',
        callback: () => {
            rProcess({
                processResourcesPath: '/Users/zzb/work/新进度条/',
                outputDirPath: targetDirPath + '/images/process/'
            });
        }
    },
];
const scriptChoices = [
    {
        name: 'rzip',
        callback: () => {
            createChildrenProcessBySpawn('sh', [`${__dirname}/rzip.sh`]);
        }
    },
    {
        name: 'ruleFile',
        callback: inquirerAfter('ruleType', ruleTypeChoices)
    },
    {
        name: 'ruhuarn',
        disabled: 'Temporary does not support',
        callback: () => {
            // to do use createChildrenProcessBySpawn
            // createChildrenProcessBySpawn('sh', [`${__dirname}/ruhuarn.sh`]);
            child_process.exec(`sh ${__dirname}/ruhuarn.sh`,
                function (err, stdout, stderr) {
                    if (err) { throw err; }
                    console.log(stdout);
                }
            );
        }
    },
];

const targetDirPath = `${projectPath}sheet`;
const outputDir = process.argv[2] || 'output';
const targetFile = 'data.js';


inquirer.prompt([
    {
        type: 'list',
        name: 'script',
        message: 'Please select a script',
        choices: scriptChoices,
    },
    {
        type: 'list',
        name: 'ruleType',
        message: 'Which type do you want to choose?',
        choices: ruleTypeChoices,
        when: function (answers) {
            return answers.script === 'ruleFile';
        }
    },
]).then(inquirerAfter('script', scriptChoices));

function inquirerAfter(key, choices) {
    return function (answers) {
        console.log(answers[key]);
        choices.find(({ name }) => name === answers[key]).callback(answers);
    }
}

function ruleFileBytype({ type, isNeedclearCache = false }) {
    ruleFile({
        type,
        targetDirPath,
        targetFile,
        outputDir,
        outputFile: targetFile,
        isNeedclearCache
    });
}

function createChildrenProcessBySpawn(p1, p2) {
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
        console.log(`child process exited with code ${code}`);
    });
}