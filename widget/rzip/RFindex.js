#!/usr/bin/env node
var fs = require("fs");

var inquirer = require('inquirer');
require('shelljs/global');

const { projectPath } = require('./config');
const {
    ruleFile,
    TYPE_COVER_NOSAVE,
    TYPE_COVER_SAVE,
    TYPE_OUTPUT
} = require("./ruleFile");

const objChoices = {
    'Do not covered and save the new file': TYPE_OUTPUT,
    'covered and save the original file': TYPE_COVER_SAVE,
    'Directly covered': TYPE_COVER_NOSAVE,
}

const choices = [
    new inquirer.Separator(),
    ...Object.keys(objChoices),
    new inquirer.Separator(),
    'watch targetFile',
    'clear output'
    // {
    //   name: 'Contact support',
    //   disabled: 'Unavailable at this time'
    // },
];

inquirer.prompt([
    {
        type: 'list',
        name: 'ruleType',
        message: 'Which type do you want to choose?',
        choices,
        // filter: function (val) {
        //     return val.toLowerCase();
        // }
    },
]).then(answers => {
    const { ruleType } = answers;
    const index = choices.findIndex(i => i === ruleType);
    const targetDirPath = `${projectPath}sheet`;
    const outputDir = process.argv[2] || 'output';
    const targetFile = 'data.js';

    console.log(index, objChoices[ruleType])

    switch (index) {
        case 1:
        case 2:
        case 3:
            ruleFileStart({ type: objChoices[ruleType] })
            break;
        case 5:
            fs.watch(targetDirPath, (eventType, filename) => {
                if (filename === targetFile) {
                    console.log(`事件类型是: ${eventType}`);
                    ruleFileStart({ type: TYPE_OUTPUT, isNeedclearCache: true })
                }
            });
            break;
        case 6:
            rm('-rf', `${targetDirPath}/${outputDir}`);
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
});
