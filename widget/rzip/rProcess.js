const fs = require("fs");
const shell = require('shelljs');

const { projectPath } = require("./config");
const { exportToES5 } = require("./ruleFile");

// // test
// rProcess({
//     processResourcesPath: '/Users/zzb/work/新进度条/',
//     outputDirPath: __dirname + '/output/',
// });

async function rProcess({
    processResourcesPath,
    outputDirPath,
    dataPath = `${projectPath}/sheet/data.js`,
    isUpdateProcess = true
}) {
    // 获取原数据
    let data = await fs.readFileSync(dataPath);
    const { rmodule, str } = exportToES5(data);
    data = (str + rmodule);

    // 临时文件写入 转ES5
    const temporaryFileDir = 'temporary';
    const temporaryFileDirPath = `${__dirname}/${temporaryFileDir}`;
    const temporaryFile = 'temporary.js';
    const temporaryFilePath = `${temporaryFileDirPath}/${temporaryFile}`;
    if (!fs.existsSync(temporaryFileDirPath)) {
        shell.mkdir(temporaryFileDirPath)
    }
    
    await fs.writeFileSync(temporaryFilePath, data);

    // 读取临时文件
    delete require.cache[require.resolve(temporaryFilePath)];
    const rData = require(temporaryFilePath);

    // 删除临时文件
    shell.rm('-rf', temporaryFileDirPath);

    // 获取 processBar
    let processBar = [];
    JSON.stringify(rData.sheetData)
        .replace(/\"\@\@\@\@\@([\s\S]+?)\@\@\@\@\@\"/ig, (all, $1) => {
            processBar.push(/\.\/images\/process\/p([\s\S]+?)\//ig.exec($1)[1])
            return `require${$1}`
        })

    // 保存进度条数据
    if (isUpdateProcess) {
        processBar = [...new Set(processBar)];
        console.log("processBar", processBar)
        const processBarDirPath = `${__dirname}/data/`;
        const processBarFile = `processBar.json`;
        const processBarFilePath = `${processBarDirPath}${processBarFile}`;
        if (!fs.existsSync(processBarDirPath)) {
            shell.mkdir(processBarDirPath)
        }
       
        fs.writeFile(processBarFilePath, JSON.stringify({ processBar, date: new Date() }, null, 4), (err) => {
            if (err) {
                return console.error(err);
            }
        })
    }

    processBar = processBar.map((item) => {
        return `${processResourcesPath}p${item}/`;
    });

    console.log(new Date().toLocaleString(), '\n', processBar)

    if (!fs.existsSync(outputDirPath)) {
        shell.mkdir(outputDirPath)
    }

    shell.rm('-rf', outputDirPath + '*')
    shell.cp('-Rf', processBar, outputDirPath)
}

module.exports = {
    rProcess
}