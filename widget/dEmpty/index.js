#!/usr/bin/env node
const shelljs = require("shelljs");
const child_process = require("child_process");

let maxCount = 0;
let emptyCount = 0;

child_process.exec("find . -mindepth 1 -maxdepth 1 -type d", function (err, stdout, stderr) {
    if (err) throw err;
    // console.log(stdout.split('\n'))

    stdout.split('\n').forEach(dir => {
        if (!dir) return;

        maxCount++;

        child_process.exec(`find ${dir} -mindepth 1 -type f`, function (err, stdout, stderr) {
            if (err) throw err;
            if (stdout === "") {
                console.log(dir)
                shelljs.rm('-rf', dir)
                emptyCount++;
            }
        });
    });
});

process.on('exit', function () {
    console.log(`\nall folders ${maxCount}, empty folders ${emptyCount}\n`);
    if (maxCount === 0) {
        console.warn('hint: This path has no folders!\n')
    } else {
        if (maxCount > emptyCount) {
            console.log('hint: The path does not have an empty folder!\n');
        } else if (maxCount === emptyCount) {
            console.log('Clear success!\n')
        }
    }
});