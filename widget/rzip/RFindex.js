#!/usr/bin/env node

const { projectPath } = require('./config');
const {
    ruleFile,
    TYPE_COVER_NOSAVE,
    TYPE_COVER_SAVE,
    TYPE_OUTPUT
} = require("./ruleFile");



ruleFile({
    type: TYPE_COVER_NOSAVE,
    targetDirPath: `${projectPath}sheet`,
    targetFile: 'data.js',
    outputDir: 'output',
    outputFile: 'data.js',
});
