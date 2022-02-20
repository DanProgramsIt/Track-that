const EmpData = require("./EmpData");
const cTable = require("console.table");
const inquirer = require("inquirer");

// New EmpData db object to access SQL query
const empData = new EmpData();

// Prompt user for information
const promptUser = (questions) => {
  return inquirer.prompt(questions);
};

// Update employee role
const updateEmpRole = async () => {
  try {
    const [roles, employees] = await Promise.all([
      empData.getRoles(),
      empData.getEmployees(),
    ]);

    const updateEmp = await promptUser([
      {
        name: "empId",
        type: "list",
        choices: function () {
          const choiceArray = [];
          employees.forEach((emp) => {
            const empObj = {
              name: `${emp.first_name} ${emp.last_name}`,
              value: emp.id,
            };
            choiceArr.push(empObj);
          });
          return choiceArr;
        },
        message: "Which employee's role would you like to update?",
      },
    ]);

    // choose the employee's new role
    const newRole = await promptUser([
      {
        name: "roleId",
        type: "list",
        choices: function () {
          const choiceArray = [];
          roles.forEach((role) => {
            const roleObj = {
              name: role.title,
              value: role.id,
            };
            choiceArr.push(roleObj);
          });
          return choiceArr;
        },
        message: "Choose the employee's new role:",
      },
    ]);

    await empData.updateEmpRole(newRole.roleId, updateEmp.empId);
    console.log("\n");
    console.log("Role Updated.");
  } catch (err) {
    console.log(err);
  }
};

// update an employee's manager
const updateEmpMgr = async () => {
  try {
    const employees = await empData.getEmployees();

    const updateEmp = await promptUser([
      {
        name: "empId",
        type: "list",
        choices: function () {
          const choiceArr = [];
          employees.forEach((emp) => {
            const empObj = {
              name: `${emp.first_name} ${emp.last_name}`,
              value: emp.id,
            };
            choiceArr.push(empObj);
          });
          return choiceArr;
        },
        message: "Which employee's manager would you like to update?",
      },
    ]);

    const managers = employees.filter((emp) => {
      return emp.id !== updateEmp.empId;
    });

    const newMgr = await promptUser([
      {
        name: "mgrId",
        type: "list",
        choices: function () {
          const choiceArr = [];
          managers.forEach((mgr) => {
            const mgrObj = {
              name: `${mgr.first_name} ${mgr.last_name}`,
              value: mgr.id,
            };
            choiceArr.push(mgrObj);
          });
          return choiceArr;
        },
        message: "Choose the employee's new manager:",
      },
    ]);

    await empData.updateEmpMgr(newMgr.mgrId, updateEmp.empId);
    console.log("\n");
    console.log("Manager Updated.");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { updateEmpRole, updateEmpMgr };
