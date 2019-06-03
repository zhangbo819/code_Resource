#!/usr/bin/env node

var inquirer = require('inquirer');

const { projectPath } = require('./config');
const {
    ruleFile,
    TYPE_COVER_NOSAVE,
    TYPE_COVER_SAVE,
    TYPE_OUTPUT
} = require("./ruleFile");


const choices = [
    'Directly covered',
    'covered and save the original file',
    'Do not covered and save the new file',
    // new inquirer.Separator(),
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
    const ruleTypeArr = [TYPE_COVER_NOSAVE, TYPE_COVER_SAVE, TYPE_OUTPUT];

    // console.log(ruleTypeArr[choices.findIndex(i => i === answers.ruleType)]);

    ruleFile({
        type: ruleTypeArr[choices.findIndex(i => i === answers.ruleType)],
        targetDirPath: `${projectPath}sheet`,
        targetFile: 'data.js',
        outputDir: process.argv[2] || 'output',
        outputFile: 'data.js',
    });
});
