const program = require('commander');
const inquirer = require('inquirer');

program
    .version('0.0.1')
    .option('-l, --list [list]', 'List of customers in CSV')
    .parse(process.argv)

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