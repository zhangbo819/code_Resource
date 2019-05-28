#!/usr/bin/env node

var fs = require("fs");
var child_process = require('child_process');
require('shelljs/global');

const {
    projectPath,
    storeKey,
    targetFile,
    outputFile
} = require("./configbefore");

main();

async function main() {
    if (!ls().some(i => i === storeKey)) {
        touch(storeKey)
    }

    const data = await fs.readFileSync(targetFile);
    await fs.writeFileSync(outputFile, data);

    await child_process.exec(`babel ${outputFile} --out-file ${outputFile} --presets es2015`, function (err, stdout, stderr) {
        console.log(err, stdout, stderr);
        if (err) throw err;

        exit(0)
    });
}