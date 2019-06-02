var fs = require("fs");

const targetFile = 'target';

fs.watch(targetFile, (eventType, filename) => {
    console.log(`事件类型是: ${eventType}`);
    if (filename) {
        console.log(`提供的文件名: ${filename}`);
    } else {
        console.log('文件名未提供');
    }
});

// fs.watchFile(targetFile, (curr, prev) => {
//     // console.log("curr", curr)
//     // console.log("----------------")
//     // console.log("prev", prev)
//     console.log(`当前的最近修改时间是: ${curr.mtime}`);
//     console.log(`之前的最近修改时间是: ${prev.mtime}`);
// });


// 使用 fs.watch() 比 fs.watchFile 和 fs.unwatchFile 更高效。 应尽可能使用 fs.watch 代替 fs.watchFile 和 fs.unwatchFile。

