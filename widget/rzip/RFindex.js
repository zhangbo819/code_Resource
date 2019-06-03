#!/usr/bin/env node

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
    ...Object.keys(objChoices),
    new inquirer.Separator(),
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
    const index = choices.findIndex(i => i === answers.ruleType);
    const targetDirPath = `${projectPath}sheet`;
    const outputDir = process.argv[2] || 'output';

    switch (index) {
        case 1:
        case 2:
        case 3:
            ruleFile({
                type: objChoices[answers.ruleType],
                targetDirPath,
                targetFile: 'data.js',
                outputDir,
                outputFile: 'data.js',
            });
            break;
        case 4:
            rm('-rf', `${targetDirPath}/${outputDir}`);
    }
});
