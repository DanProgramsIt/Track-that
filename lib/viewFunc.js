const EmpData = require("./EmpData");
const cTable = require("console.table");
const inquirer = require("inquirer");

// New EmpData db object to access SQL query
const empData = new EmpData();

// Prompt user for information
const promptUser = (questions) => {
  return inquirer.prompt(questions);
};

// View all employees
const viewEmployees = async () => {
  try {
    // query the db for employee information and display it
    const rows = await empData.getEmployees();
    console.table(rows);
  } catch (err) {
    console.log(err);
  }
};

// View all roles
const viewRoles = async () => {
  try {
    // query the db for role information and display it
    const rows = await empData.getRoles();
    console.table(rows);
  } catch (err) {
    console.log(err);
  }
};

// View all departments
const viewDepartments = async () => {
  try {
    const rows = await empData.getDepartments();
    console.table(rows);
  } catch (err) {
    console.log(err);
  }
};

// Choose a department and view all of its employees
const viewEmployeesByDept = async () => {
  try {
    const departments = await empData.getDepartments();

    const chosenDept = await promptUser([
      {
        name: "deptId",
        type: "list",
        choices: function () {
          const choicesArr = [];
          departments.forEach((dept) => {
            const deptObj = {
              name: dept.department,
              value: dept.id,
            };
            choicesArr.push(deptObj);
          });
          return choicesArr;
        },
        message: "Which department's employees would you like to view'?",
      },
    ]);

    // get the list of employees in the chosen department and display it
    const rows = await empData.getEmployeesByDept(chosenDept.deptId);
    console.log("\n");
    console.table(rows);
  } catch (err) {
    console.log(err);
  }
};

const viewEmployeesByMgr = async () => {
  try {
    const employees = await empData.getEmployees();
    const chosenMgr = await promptUser([
      {
        name: "mgrId",
        type: "list",
        choices: function () {
          const choicesArr = [];
          employees.forEach((emp) => {
            const mgrObj = {
              name: `${emp.first_name} ${emp.last_name}`,
              value: emp.id,
            };
            choicesArr.push(mgrObj);
          });
          return choicesArr;
        },
        message: "Which manager's employees would you like to view'?",
      },
    ]);

    // get the employees with the chosen manager
    const rows = await empData.getEmployeesByMgr(chosenMgr.mgrId);

    if (!rows.length) {
      console.log("This manager has no employees.");
    } else {
      console.log("\n================================\n");
      console.table(rows);
    }
  } catch (err) {
    console.log(err);
  }
};

// View the total budget within a chosen department
const viewBudgetByDept = async () => {
  try {
    const departments = await empData.getDepartments();
    const chosenDept = await promptUser([
      {
        name: "deptId",
        type: "list",
        choices: function () {
          const choicesArr = [];
          departments.forEach((dept) => {
            const deptObj = {
              name: dept.department,
              value: dept.id,
            };
          });
          return choicesArr;
        },
        message:
          "Which department's total utilized budget would you like to view'?",
      },
    ]);

    // Sum the salaries of the employees in the chosen department
    const rows = await empData.getBudgetByDept(chosenDept.deptId);
    if (rows.length) {
      console.log("\n");
      console.table(rows);
    } else {
      console.log("\n================================\n");
      console.log("This department currently has no active employees.");
      console.log("\n================================\n");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { viewEmployees, viewRoles, viewDepartments, viewEmployeesByDept, viewEmployeesByMgr, viewBudgetByDept }