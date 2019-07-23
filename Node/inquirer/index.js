const program = require('commander');
const inquirer = require('inquirer');

program
    .version('0.0.1')
    .option('-l, --list <list>', 'List of customers in CSV')
    .parse(process.argv)

console.log(program.list)

// program
//   .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue');

// program.parse(process.argv);

// console.log(`cheese: ${program.cheese}`);

let questions = [
    {
        type: "input",
        name: "sender.email",
        message: "Sender's email address - "
    },
    {
        type: "input",
        name: "sender.name",
        message: "Sender's name - "
    },
    {
        type: "input",
        name: "subject",
        message: "Subject - "
    }
];

inquirer.prompt(questions).then(function (answers) {
    console.log(answers);
});