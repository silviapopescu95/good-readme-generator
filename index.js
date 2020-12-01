// Adding JavaScript modules
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Please enter the title of your project: "
        },
        {
            type: "input",
            name: "description",
            message: "Enter a description of your project: "
        }, 
        {
            type: "input",
            name: "usage",
            message: "Enter usage information for your project: "
        }, 
        {
            type: "input",
            name: "contribution",
            message: "Enter contribution guidelines for your project: "
        }, 
        {
            type: "input",
            name: "test",
            message: "Enter test instructions for your project: "
        },
        {
            type: "list",
            message: "Choose the license for your application from the list below: ",
            name: "license",
            choices: [
                "1",
                "2",
                "3",
                "4"
            ]
        },
        {
            type: "input",
            name: "username",
            message: "Enter your GitHub username: "
        },
        {
            type: "input",
            name: "email",
            message: "Enter you email address: "
        },
    ]);
}

function generateMarkdown(answers) {

}

prompt()
.then(function(answers) {
    const markdown = generateMarkdown(answers);

    return writeFileAsync("README.md", markdown);
})
.then(function() {
    console.log("You successfully created a README file.");
})
.catch(function(err) {
    console.log(err);
})