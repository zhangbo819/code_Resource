const fs = require('fs');
require('shelljs/global');

function audioReName(targetPath) {

    if (!fs.existsSync(targetPath)) {
        console.log(`文件夹${targetPath}不存在`)
        return;
    }

    const targetChildDir = ['stem', 'result'];

    mkdir('-p', targetChildDir.map(i => `${targetPath}/${i}`))

    const numData = {};

    targetChildDir.forEach(i => {
        numData[i] = ls(`${targetPath}/${i}`).filter(file => (new RegExp("^" + i).test(file))).length + 1;
    })

    console.log(Object.entries(numData).map(([key, value]) => [key, value - 1]))

    console.log('watch start');

    const ChildDirReg = new RegExp(targetChildDir.reduce((r, i, index) => r += (index === 0 ? i : ('|' + i)), '^'))

    fs.watch(targetPath, {
        recursive: true     // 指示是应该监视所有子目录，还是仅监视当前目录。这在指定目录时适用，并且仅在受支持的平台上适用（请参阅警告）。默认值： false。
    }, (eventType, filename) => {
        const [subDir, beforeName] = filename.split('/');
        const targetFileName = `${targetPath}/${filename}`;

        if (
            beforeName !== '.DS_Store' &&
            eventType === 'rename' &&
            typeof beforeName !== 'undefined' &&        // 是子文件
            !ChildDirReg.test(beforeName) &&            // 原名字已经符合标准 略过
            fs.existsSync(targetFileName)               // 文件存在
        ) {
            console.log("in ", filename)
            const subType = filename.slice(-4);

            const num = numData[subDir];

            mv(targetFileName, `${targetPath}/${subDir}/${subDir + num + subType}`)

            numData[subDir] = num + 1;
        }
    });
}

module.exports = {
    audioReName
}