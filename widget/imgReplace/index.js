#!/usr/bin/env node

require('shelljs/global');

var path = process.argv[2] || '/Users/zzb/work/txbstyle/RN_chinese/ReactNative/sheet/images';

// cd('./test')
// cp('-f', './*', '../')

cd(path)

ls().forEach(function (file, index) {
    // console.log(file)
    replace(file, index)
});

function replace(fileName) {
    cd(fileName)

    if (ls().includes('zhitu-des')) {
        // console.log(fileName + ' 有')

        cd('zhitu-des')

        cp('-f', './*', '../')

        cd('../')

        rm('-r', 'zhitu-des')

        console.log('文件 ' + fileName + ' 执行成功')
    } else {
        console.log('文件 ' + fileName + ' 无')
    }

    cd('../')
}