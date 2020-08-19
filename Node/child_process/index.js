const spawn = require('child_process').spawn;
const ls = spawn('sh', ['index.sh', '--sss']);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});


// var readline = require('readline');

// setInterval(() => {
//     // process.stdout.clearLine();
//     // process.stdout.cursorTo(0);
//     readline.cursorTo(process.stdout, 0);
//     process.stdout.write(Math.random() + '')
// }, 100)