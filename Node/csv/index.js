const program = require('commander');
const csv = require('csv');
const fs = require('fs');

program
    .version('0.0.1')
    .option('-l, --list [list]', 'List of customers in CSV')
    .parse(process.argv)

let parse = csv.parse;
console.log(program.list)
let stream = fs.createReadStream(program.list)
    .pipe(parse({ delimiter: ',' }));

stream
    .on('data', function (data) {
        console.log("data", data);
    });