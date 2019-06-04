const fs = require("fs");
const data = require("./data/processBar.json");
const shell = require('shelljs');

// // test
// rProcess({
//     processResourcesPath: '/Users/zzb/work/新进度条/',
//     outputDirPath: __dirname + '/output/'
// });

async function rProcess({ processResourcesPath, outputDirPath }) {
    let { processBar, date } = data;

    processBar = processBar.map((item) => {
        return `${processResourcesPath}${item.slice(1)}/`;
    });

    console.log(new Date(date).toLocaleString(), '\n', processBar)

    if (!fs.existsSync(outputDirPath)) {
        shell.mkdir(outputDirPath)
    }

    shell.cp('-Rf', processBar, outputDirPath)
}

module.exports = {
    rProcess
}