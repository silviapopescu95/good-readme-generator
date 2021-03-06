// Adding JavaScript modules
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

// Writes the file
const writeFileAsync = util.promisify(fs.writeFile);

// Prompts user with a series of questions to build README.md file
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
            name: "install",
            message: "Enter installation instructions for your project: "
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
                "BSD",
                "MIT",
                "Mozilla Public License 2.0"
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

function generateLicenseBadge(licenseInput) {
    if (licenseInput === "BSD") {
        return `[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`
    } else if (licenseInput === "MIT") {
        return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
    } else {
        return `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`
    }
}

function generateMarkdown(answers) {
return `
# ${answers.title}

## Description
${answers.description}

## Table of Contents
- [Go to Installation Instructions](#installation-instructions)
- [Go to Usage Information](#usage-information)
- [Go to Contribution Guidelines](#contribution-guidelines)
- [Go to Test Instructions](#test-instructions)
- [Go to License](#license)
- [Questions?](#questions)

## Installation Instructions
${answers.install}

## Usage Information
${answers.usage}

## Contribution Guidelines
${answers.contribution}

## Test Instructions
${answers.test}

## License
${generateLicenseBadge(answers.license)};
- This application is licensed under ${answers.license}.

## Questions?
View the source code here: [Go to GitHub](https://github.com/${answers.username})
For any additional questions regarding this application, please contact me at: ${answers.email}
`;
}


promptUser()
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
