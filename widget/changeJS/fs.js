#!/usr/bin/env node

var fs = require("fs");
require('shelljs/global');

// var path = process.argv[2] || './data';
var path = process.argv[2] || '/Users/zzb/work/txbstyle/RN_chinese/ReactNative/sheet/data.js';
var outPutName = process.argv[3] || 'data.js';

// to do use import
// import data from '/Users/zzb/work/txbstyle/RN_chinese/ReactNative/sheet/data.js';

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


