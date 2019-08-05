
const program = require('commander');
require('shelljs/global');
const inquirer = require('inquirer');

const { projectPath } = require('./config');

program
    .option('-t, --type <type>', 'add the specified type of cheese', 'old')
    .parse(process.argv);

const { type } = program;
// console.log('program type', type)

main();

async function main() {
    // console.log('test', pwd().stdout)

    // console.log('projectPath', projectPath)
    // console.log(`${__dirname}\n${__filename}\n${pwd().stdout}`)

    const targetPath = {
        'ole': projectPath,
        'new': '/Users/zzb/work/qingke_html/react_native/s026/ReactNative'
    }[type];

    cd(targetPath)

    const choices = ls()
        .filter(i => i.slice(-4) === '.zip')
        .map(name => ({ name, checked: true }));   // disabled: 'out of stock'

    // console.log(choices)

    if (choices.length !== 0) {
        choices.unshift(new inquirer.Separator(' ===== Select the items to delete ===== '));
        choices.push(new inquirer.Separator(' ====================================== '));

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

    exit(0);
}



// child_process.exec("find . -name '*.zip' -type f -print -exec rm -i {} \;", function (err, stdout, stderr) {
//     console.log(err, stdout, stderr);
//     if (err) throw err;
// });
