const EmpData = require("./lib/EmpData");
const connect = require("./lib/dbConn");
const cTable = require("console.table");
const figlet = require("figlet");
const inquirer = require("inquirer");
const update = require("./lib/updateFunc");
const add = require("./lib/addFunc");
const view = require("./lib/viewFunc");
const del = require("./lib/delFunc");
const connection = require("./lib/dbConn");

// Prompt user for answers
const promptUser = (questions) => {
  return inquirer.prompt(questions);
};

// To exit app
const exitApp = () => {
  console.log("See Ya!");
  connection.end();
  process.exit();
};

// Object task functions to fire from inquirer prompt
const actionFunctions = {
  "View All Employees": view.viewEmployees,
  "View All Employees by Department": view.viewEmployeesByDept,
  "View All Employees by Manager": view.viewEmployeesByManager,
  "Add Employee": add.add.Employee,
  "Remove Employee": del.delEmployee,
  "Update Employee Role": update.updateEmployeeRole,
  "Update Employee Manager": update.updateEmployeeManager,
  "View All Roles": view.viewRoles,
  "Add Role": add.addRole,
  "Remove Role": del.delRole,
  "View All Departments": view.viewDepartments,
  "View Budget by Department": view.viewBudgetByDept,
  "Add Department": add.addDepartment,
  "Remove Department": del.delDepartment,
  "Exit Application": exitApp,
};

// List of Tasks
const actions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "task",
    choices: [
      "View All Employees",
      "View All Employees by Department",
      "View All Employees by Manager",
      "Add Employee",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Manager",
      "View All Roles",
      "Add Role",
      "Remove Role",
      "View All Departments",
      "View Budget by Department",
      "Add Department",
      "Remove Department",
      "Exit Application",
    ],
  },
];

// Prompt user to complete
const init = async () => {
  try {
    console.log("\n----------\n");
    const actionChoice = await promptUser(action);
    console.log("\n----------\n");
    await actionFunctions[actionChoice.task]();
    init();
  } catch (error) {
    console.log(err);
  }
};

// Graphic art for the initial start
const start = () => {
    figlet('   Track That', {
        font: 'speed'
    }, (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log("\n")
        console.log(data);
        console.log("================================================")
        console.log("\n                  Welcome to \n          (>'.'>) Track that <('.'<)")
        console.log("================================================")
        init();
    })
}

start();