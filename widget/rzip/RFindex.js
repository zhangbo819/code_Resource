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

const objChoices = {
    'Do not covered and save the new file': TYPE_OUTPUT,
    'Covered and save the original file': TYPE_COVER_SAVE,
    'Directly covered': TYPE_COVER_NOSAVE,
}

const indexChoices = ['rzip', 'ruhuarn', 'ruleFile'];
const choices = [
    // new inquirer.Separator(),
    ...Object.keys(objChoices),
    // new inquirer.Separator(),
    'Watch targetFile',
    'Clear output',
    'Replace the progress bar'
    // {
    //   name: 'Contact support',
    //   disabled: 'Unavailable at this time'
    // },
];
inquirer.prompt([
    {
        type: 'list',
        name: 'index',
        message: 'Please select a script',
        choices: indexChoices,
    },
    {
        type: 'list',
        name: 'ruleType',
        message: 'Which type do you want to choose?',
        choices,
        when: function (answers) {
            // console.log('answers', answers)
            return answers.index === indexChoices[2];
        }
    },
]).then(answers => {
    console.log(JSON.stringify(answers, null, '  '));

    const { index } = answers;
    if (index === indexChoices[0]) {
        child_process.exec(`cd ${__dirname} && ./updateKey.js && ./index.js`,
            function (err, stdout, stderr) {
                if (err) { console.warn(err); }
                console.log(stdout);
            }
        );
    } else if (index === indexChoices[1]) {
        child_process.exec(`cd ${__dirname} && npm run ruhuanrn`,
            function (err, stdout, stderr) {
                if (err) { throw err; }
                console.log(stdout);
            }
        );
    } else if (index === indexChoices[2]) {
        ruleFileStart(answers)
    }
});

function ruleFileStart(answers) {
    const { ruleType } = answers;
    const index = choices.findIndex(i => i === ruleType);
    const targetDirPath = `${projectPath}sheet`;
    const outputDir = process.argv[2] || 'output';
    const targetFile = 'data.js';

    console.log(index, objChoices[ruleType])

    switch (index) {
        case 0:
        case 1:
        case 2:
            ruleFileStart({ type: objChoices[ruleType] })
            break;
        case 3:
            fs.watch(targetDirPath, (eventType, filename) => {
                if (filename === targetFile) {
                    console.log(`事件类型是: ${eventType}`);
                    ruleFileStart({ type: TYPE_OUTPUT, isNeedclearCache: true })
                }
            });
            break;
        case 4:
            rm('-rf', `${targetDirPath}/${outputDir}`);
            break;
        case 5:
            rProcess({
                processResourcesPath: '/Users/zzb/work/新进度条/',
                outputDirPath: targetDirPath + '/images/process/'
            });
            break;
    }

    function ruleFileStart({ type, isNeedclearCache = false }) {
        ruleFile({
            type,
            targetDirPath,
            targetFile,
            outputDir,
            outputFile: targetFile,
            isNeedclearCache
        });
    }
}