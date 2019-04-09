#!/usr/bin/env node
var fs = require("fs");
require('shelljs/global');

var path = process.argv[2] || './data';
var outPutName = process.argv[3] || 'data.js';

console.log('fs start path, outPutName', path, outPutName)
const data = require(path);

const changeData = 'export const sheetData = ' + JSON.stringify(data);

mkdir('-p', 'output');
cd('output');
fs.writeFile(outPutName, changeData, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log("数据写入成功！");
});


