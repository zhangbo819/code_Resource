const fs = require('fs');

const targetName = __dirname + '/tmp/a1.js';
const outputName = __dirname + '/tmp/a.js';

fs.rename(targetName, outputName, (err) => {
    if (err) throw err;
    console.log('重命名完成');
});