//index.js
const readline = require('readline');
const unloadChar = '-';
const loadedChar = '=';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('你想对谁说声hello？ ', answer => {
    let i = 0;
    let time = setInterval(() => {
        if (i > 10) {
            clearInterval(time);
            readline.cursorTo(process.stdout, 0, 0);
            readline.clearScreenDown(process.stdout);
            console.log(`hello ${answer}`);
            process.exit(0)
            return
        }
        readline.cursorTo(process.stdout, 0, 1);
        readline.clearScreenDown(process.stdout);
        renderProgress('saying hello', i);
        i++
    }, 500);
});

function renderProgress(text, step) {
    const PERCENT = Math.round(step * 10);
    const COUNT = 2;
    const unloadStr = new Array(COUNT * (10 - step)).fill(unloadChar).join('');
    const loadedStr = new Array(COUNT * (step)).fill(loadedChar).join('');
    process.stdout.write(`${text}:【${loadedStr}${unloadStr}|${PERCENT}%】`)
}