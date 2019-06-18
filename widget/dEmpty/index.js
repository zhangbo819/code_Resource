#!/usr/bin/env node
const shelljs = require("shelljs");
const child_process = require("child_process");

let emptyCount = 0;
let needRmCount = 0;

// cd 
process.chdir('/Users/zzb/work/txbstyle/RN_chinese/ReactNative/sheet/images');

child_process.exec("find . -mindepth 1 -maxdepth 1 -type d", {
    maxBuffer: 1024 * 500   // maxBuffer 指定stdout或stderr上允许的最大数据量 - 如果超过此值，则子进程将被终止。
                            // 默认 200KB 当前为500KB
}, function (err, stdout, stderr) {
    if (err) throw err;
    // console.log(stdout.split('\n'))

    stdout.split('\n').forEach(dir => {
        if (!dir) return;

        child_process.exec(`find ${dir} -mindepth 1 -type f`, { maxBuffer: 1024 * 500 }, function (err, stdout, stderr) {
            if (err) throw err;
            if (stdout.split('\n').length > 2) return;
            if (/\.DS_Store/.test(stdout.split('\n')[0]) || stdout === '') {
                console.log(dir)
                needRmCount++;
                shelljs.rm('-rf', dir)
                emptyCount++;
            }
        });
    });
});

process.on('exit', function () {
    console.log(`\nempty folders ${needRmCount}, cleared folders ${emptyCount}\n`);
    if (needRmCount === 0) {
        console.warn('hint: The path does not have an empty folder!\n');
    } else if (needRmCount === emptyCount) {
        console.log('Clear success!\n')
    }
});
