var child_process = require('child_process');

require('shelljs/global');

console.log('test', pwd().stdout)

cd(pwd().stdout);

// rm('-i', 'test.zip');

child_process.exec("find . -name '*.zip' -type f -print -exec rm {} \;", function (err, stdout, stderr) {
    console.log(err, stdout, stderr);
    if (err) throw err;
});

// child_process.execFile('./ruhuarn.sh',
//     // ['-H', ip, '-U', username, '-P', password, '-N', newpassword], 
//     // null,
//     // null,
//     function (err, stdout, stderr) {
//         console.log(err, stdout, stderr);
//         if (stdout === 'err unpList 为空\n') {
//             console.log('上传失败 unpList列表为空')
//             child_process.exec('open ./', function (err, stdout, stderr) {
//                 console.log(err, stdout, stderr);
//                 if (err) throw err;
//             });
//         } else {
//             // console.log('上传成功 即将删除压缩包')
//             // to do 询问
//         }
//     }
// );