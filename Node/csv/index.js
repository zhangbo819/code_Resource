// const program = require('commander');
const csv = require('csv');
const fs = require('fs');

// program
//   .version('0.0.1')
//   .option('-l, --list [list]', 'List of customers in CSV')
//   .parse(process.argv)

// const targePath = './input/employees.csv';

let contactList = [];
let parse = csv.parse;
// console.log(program.list)
let stream = fs.createReadStream(targePath)
    .pipe(parse({ delimiter: "," }));

stream
    .on("error", function (err) {
        return console.error(err.message);
    })
    .on("data", function (data) {
        let name = data[0] + " " + data[1];
        let email = data[2];
        contactList.push({ name: name, email: email });
    })
    .on("end", function () {
        console.log('end contactList \n', JSON.stringify(contactList, null, 4))
    });