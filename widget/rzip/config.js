// var fs = require("fs");

const {
    projectPath,
    storeKey,
    targetFile,
    outputFile
} = require("./configbefore");

const { STORAGE_KEY } = require(outputFile);

console.log('STORAGE_KEY', STORAGE_KEY)

// to do 读取sh
// var data = fs.readFileSync('ruhuarn.sh');
// console.log("同步读取: ", data.toString('UTF-8'));


module.exports = {
    projectPath,
    STORAGE_KEY
}