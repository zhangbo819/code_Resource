// var fs = require("fs");

const projectPath = '/Users/zzb/work/txbstyle/RN_chinese/ReactNative/';

const { STORAGE_KEY } = require(projectPath + 'src/config/storeKey');

console.log('STORAGE_KEY', STORAGE_KEY)
// to do 读取sh
// var data = fs.readFileSync('ruhuarn.sh');
// console.log("同步读取: ", data.toString('UTF-8'));


module.exports = {
    projectPath,
    STORAGE_KEY
}