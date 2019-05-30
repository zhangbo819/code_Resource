var fs = require("fs");
require('shelljs/global');


ruleFile({
    targetFile: './data.js',
    outputDir: 'dist',
    get outputFile() {
        return this.targetFile;
    }
});


async function ruleFile({ targetFile, outputDir = null, outputFile }) {
    // 同步读取
    let data = await fs.readFileSync(targetFile);
    // console.log("同步读取: ", data);

    const data_original = data.toString('utf8');

    const { rmodule, str } = exportToES5(data);

    data = (str + rmodule);

    if (outputDir !== null) {
        if (!ls().some(i => i === outputDir)) {
            mkdir(outputDir)
        }
    }

    // appendFile
    await fs.writeFileSync(outputFile, data);

    const rData = require(`./${outputDir === null ? '' : (outputDir + '/')}${outputFile}'`);

    let changerData = 'export const sheetData = ' + JSON.stringify(rData.sheetData, null, 4);

    // 恢复require
    changerData = changerData.toString('UTF-8')
        .replace(/\"require\([\s\S]+?\)\"/ig, (s) => {
            // console.log("last ssssssss", s.slice(1, -1))
            return s.slice(1, -1);
        });

    // 替换audio
    changerData = changerData
        .replace(/http\:\/\/test\.txbimg\.com\/RN_chinese\/ReactNative\/sheet\//ig, '');

    await fs.writeFileSync(outputFile, changerData);

    // console.log(`ruleFile ${res ? '成功' : '失败'}`);

    return { data_original };

    // exit(0);
}

function exportToES5(str = '') {
    let rmodule = '{';

    // 处理 require
    str = str.toString('UTF-8').replace(/require\([\s\S]+?\)/ig, (s) => {
        // console.log("first sssss", s)
        return `\"${s}\"`;
    });

    // to do function & 结构
    // 处理 module.exports
    // to do \];
    str = str.replace(/export const ([\s\S]+?)=([\s\S]+?)\];/ig, (all, $1, $2) => {
        // console.log("second ", $2)
        rmodule += `${$1}:${$2}]`;
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

module.exports = {
    ruleFile,
    exportToES5
};
