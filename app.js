const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];


function managerSignIn() {
    inquirer.prompt([{
        type: "input",
        name: "managerName",
        message: "What is your name?",
        validate: function(answer) {
            if(answer !== "") {
                return true;
            }
            return "Please enter a valid name"
        }
    }, {
        type: "input",
        name: "managerId",
        message: "What is your id?"
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is your email?"
    },
    {
        type: "input",
        name: "managerOfficenumber",
        message: "What is your Office number?"
    },
    ]).then(function (answers) {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficenumber)
        teamMembers.push(manager)
        addEmployee()
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "list",
            name: "employeeChoice",
            message: "Would you like to add an employee",
            choices: ["intern", "engineer", "none"]
        },

    ]).then(function(answers){
        switch(answers.employeeChoice) {
            case "intern":
              addIntern()
              break;
            case "engineer":
                addEngineer()
              break;
            default:
            buildTeam();
          }
    })
}

function addIntern() {
    inquirer.prompt([{
        type: "input",
        name: "internName",
        message: "What is your name?"
    }, {
        type: "input",
        name: "internId",
        message: "What is your id?"
    },
    {
        type: "input",
        name: "internEmail",
        message: "What is your email?"
    },
    {
        type: "input",
        name: "internSchool",
        message: "Where do you go to school?"
    },
    ]).then(function (answers) {
        const intern= new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
        teamMembers.push(intern)
        addEmployee()
    })

}

function addEngineer() {
    inquirer.prompt([{
        type: "input",
        name: "engineerName",
        message: "What is your name?"
    }, {
        type: "input",
        name: "engineerId",
        message: "What is your id?"
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "What is your email?"
    },
    {
        type: "input",
        name: "engineerGithub",
        message: "What is your github username?"
    },
    ]).then(function (answers) {
        const engineer= new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
        teamMembers.push(intern)
        addEmployee()
    })
}

function buildTeam(){
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
}

managerSignIn();