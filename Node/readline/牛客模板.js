const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on('line', function (line) {
  console.log('line', line)
  // const tokens = line.split(' ');
  // console.log(parseInt(tokens[0]) + parseInt(tokens[1]));
});