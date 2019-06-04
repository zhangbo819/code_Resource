var fs = require("fs");
require('shelljs/global');

const TYPE_COVER_NOSAVE = "coverNoSave";
const TYPE_COVER_SAVE = "coverSave";
const TYPE_OUTPUT = "output";

// ruleFile({
//     targetFilePath: './data.js',
//     outputDir: 'dist',
//     get outputFile() {
//         return this.targetFilePath;
//     }
// });


async function ruleFile(options) {
    let {
        type = TYPE_OUTPUT,
        targetDirPath, targetFile,
        outputDir, outputFile,
        replaceAudio = false,
        isNeedclearCache = false,
        isUpdateProcess = true
    } = options;

    let isCoverNoSave = false;
    let isCoverSave = false;
    let isOutput = false;

    switch (type) {
        case TYPE_COVER_NOSAVE:
            isCoverNoSave = true;
            break;
        case TYPE_COVER_SAVE:
            isCoverSave = true;
            break;
        case TYPE_OUTPUT:
            isOutput = true;
            break;
    }

    const IS_COVER = (isCoverNoSave || isCoverSave);

    const targetFilePath = `${targetDirPath}/${targetFile}`;
    const outputFilePath = `${targetDirPath}/${IS_COVER ? targetFile : (outputDir + '/' + outputFile)}`;

    // 同步读取
    let data = await fs.readFileSync(targetFilePath);
    // console.log("同步读取: ", data);

    const data_original = data.toString('utf8');

    const { rmodule, str } = exportToES5(data);

    data = (str + rmodule);

    cd(targetDirPath)
    if (isOutput || isCoverSave) {
        if (!ls().some(i => i === outputDir)) {
            mkdir(outputDir)
        }
        cd(outputDir)
    }

    // 第一次写入 转ES5
    await fs.writeFileSync(IS_COVER ? targetFilePath : outputFilePath, data);

    if (isNeedclearCache) {
        delete require.cache[require.resolve(outputFilePath)];
    }
    const rData = require(outputFilePath);

    data = 'export const sheetData = ' + JSON.stringify(rData.sheetData, null, 4);

    // 恢复require
    data = data.toString('UTF-8').replace(/\"require\([\s\S]+?\)\"/ig, (s) => {
        return s.slice(1, -1);
    });

    // 替换audio
    if (replaceAudio) {
        data = data.replace(/http\:\/\/test\.txbimg\.com\/RN_chinese\/ReactNative\/sheet\//ig, '');
    }

    // 进度条处理
    let arrProcessBar = [];
    data = data.replace(/\"\@\@\@\@\@([\s\S]+?)\@\@\@\@\@\"/ig, (all, $1) => {
        arrProcessBar.push(/\.\/images\/process\/([\s\S]+?)\//ig.exec($1)[1])
        return `require${$1}`
    })

    // 保存进度条数据
    if (isUpdateProcess) {
        arrProcessBar = [...new Set(arrProcessBar)];
        console.log("arrProcessBar", arrProcessBar)
        const processBarDirPath = `${__dirname}/data/`;
        const processBarFile = `processBar.json`;
        const processBarFilePath = `${processBarDirPath}${processBarFile}`;
        const isExist = fs.existsSync(processBarFilePath);
        if (!isExist) {
            cd(processBarDirPath)
            touch(processBarFile)
            cd('-')
        }
        await fs.writeFileSync(processBarFilePath, JSON.stringify({ processBar: arrProcessBar, date: new Date() }, null, 4))
    }

    // 第二次写入 去除逻辑
    await fs.writeFileSync(IS_COVER ? targetFilePath : outputFilePath, data);

    if (isCoverSave) {
        await fs.writeFileSync(`${targetDirPath}/${outputDir}/${outputFile}`, data_original);
    }

    // console.log(`ruleFile ${res ? '成功' : '失败'}`);

    cd(__dirname)

    // exit(0);

    return {
        data_original,
        changer_data: data
    };
}

function exportToES5(str = '') {
    let rmodule = '{\n';

    // 处理 require
    str = str.toString('UTF-8').replace(/require\([\s\S]+?\)/ig, (s) => {
        // console.log("first sssss", s)
        return `\"${s}\"`;
    });

    // to do function & 结构
    // 处理 module.exports
    // to do \];
    // str = str.replace(/export const ([\s\S]+?)=([\s\S]+?)\];/ig, (all, $1, $2) => {
    str = str.replace(/export const ([\s\S]+?)=([\s\S]+?)\;/ig, (all, $1, $2) => {
        // console.log("second ", all)
        rmodule += `    ${$1}:${$2}\n`;
        // rmodule += `${$1}:${$2}]`;
        return '';
    });

    rmodule += "}";
    rmodule = '\nmodule.exports = ' + rmodule;
    // console.log(str)
    return {
        rmodule,
        str
    }
}

module.exports = {
    ruleFile,
    exportToES5,
    TYPE_COVER_NOSAVE,
    TYPE_COVER_SAVE,
    TYPE_OUTPUT
};
