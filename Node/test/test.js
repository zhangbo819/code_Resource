var fs = require("fs");
require('shelljs/global');

const targetFile = 'data.js';
const outputDir = 'dist';
const outputFile = targetFile;

ruleFile();

function exportToES5(str = '') {
    let rmodule = '{';

    // 处理 require
    str = str.toString('UTF-8').replace(/require\([\s\S]+?\)/ig, (s) => {
        // console.log("first sssss", s)
        return `\"${s}\"`;
    });

    // to do function & 结构
    // 处理 module.exports
    str = str.replace(/export const ([\s\S]+?)=([\s\S]+?);/ig, (all, $1, $2) => {
        // console.log("second ", $2)
        rmodule += `${$1}:${$2}`;
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


async function ruleFile() {
    // 同步读取
    let data = await fs.readFileSync(targetFile);

    // console.log("同步读取: ", data);

    const { rmodule, str } = exportToES5(data);

    data = (str + rmodule);

    if (!ls().some(i => i === outputDir)) {
        mkdir(outputDir)
    }
    cd(outputDir)

    // appendFile
    await fs.writeFileSync(outputFile, data);

    const rData = require('./dist/data');

    const changerData = 'export const sheetData = ' + JSON.stringify(rData.sheetData, null, 4);

    await fs.writeFileSync(outputFile, changerData);

    let outputrdata = await fs.readFileSync(outputFile);
    outputrdata = outputrdata
        .toString('UTF-8')
        .replace(/\"require\([\s\S]+?\)\"/ig, (s) => {
            // console.log("last ssssssss", s.slice(1, -1))
            return s.slice(1, -1);
        });

    await fs.writeFileSync(outputFile, outputrdata);

    cd('../')
    exit(0);
}

module.exports = {
    ruleFile,
    exportToES5
};
