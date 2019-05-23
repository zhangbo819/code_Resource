// #!/usr/bin/env node

// 1

// var argv = require('yargs')
//   .alias('n', 'name')
//   .argv;

// console.log('hello ', argv.n);
// console.log(argv._);

// // node index.js a --name=tom b c

// 2

// var argv = require('yargs')
//   .option('n', {
//     alias : 'name',
//     demand: true,
//     default: 'tom',
//     describe: 'your name',
//     type: 'string'
//   })
//   .argv;

// console.log('hello ', argv.n);

// // node index.js

// 3
// var argv = require('yargs')
//   .option('f', {
//     alias : 'name',
//     demand: true,
//     default: 'tom',
//     describe: 'your name',
//     type: 'string'
//   })
//   .usage('Usage: hello [options]')
//   .example('hello -n tom', 'say hello to Tom')
//   .help('h')
//   .alias('h', 'help')
//   .epilog('copyright 2015')
//   .argv;

// console.log('hello ', argv.n);

// // node index.js -h

// 4 
// require('shelljs/global');
// var argv = require('yargs')
//     .command("morning", "good morning", function (yargs) {
//         echo("Good Morning");
//         var argv = yargs.reset()
//             .option("m", {
//                 alias: "message",
//                 description: "provide any sentence"
//             })
//             .help("h")
//             .alias("h", "help")
//             .argv;

//         echo(argv.m);
//     })
//     .argv;

// // node index.js morning -m

