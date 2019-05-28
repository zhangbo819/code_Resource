var fs = require("fs");
require('shelljs/global');

const targetFile = 'data.js';
const outputDir = 'dist';
const outputFile = targetFile;

main();


async function main() {
    // 同步读取
    let data = await fs.readFileSync(targetFile);

    // console.log("同步读取: ", data);

    // 处理 require
    data = data.toString('UTF-8').replace(/require\([\s\S]+?\)/ig, (s) => {
        // console.log("first sssss", s)
        return `\"${s}\"`;
    });

    // 处理 module.exports
    data = data.replace(/export const sheetData = \[([\s\S]+?)\];/ig, (s, a) => {
        // console.log("second sssss", a)
        return `module.exports = { sheetData: [${a}] }`;
    });

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

    exit(0);
}


