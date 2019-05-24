// var child_process = require('child_process');

require('shelljs/global');
const inquirer = require('inquirer');

main();

async function main() {
    // console.log('test', pwd().stdout)

    console.log(__dirname, __filename, pwd().stdout)

    cd('/Users/zzb/work/txbstyle/RN_chinese/ReactNative')

    const choices = ls()
        .filter(i => i.slice(-4) === '.zip')
        .map(name => ({ name, checked: true }));   // disabled: 'out of stock'

    console.log(choices)

    if (choices.length !== 0) {
        choices.unshift(new inquirer.Separator(' === Select the items to delete === '));
        choices.push(new inquirer.Separator(' ========================== '));

        const { toppings } = await inquirer.prompt([
            {
                type: 'checkbox',
                message: 'Select toppings',
                name: 'toppings',
                choices,
                //   validate: function(answer) {
                //     if (answer.length < 1) {
                //       return 'You must choose at least one topping.';
                //     }
                //     return true;
                //   }
            }
        ])
        // console.log(toppings)

        if (toppings.length) {
            rm(toppings)
        } else {
            console.log('No zip selected')
        }
    } else {
        console.log('No zip')
    }

    exit(1);
}



// child_process.exec("find . -name '*.zip' -type f -print -exec rm -i {} \;", function (err, stdout, stderr) {
//     console.log(err, stdout, stderr);
//     if (err) throw err;
// });

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