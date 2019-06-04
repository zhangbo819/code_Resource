var fs = require("fs");

const targetPath = __dirname + '/test';

// fs.exists(targetPath, (isExist) => {
//     console.log(isExist)
// })
const isExist = fs.existsSync(targetPath)
console.log(isExist)