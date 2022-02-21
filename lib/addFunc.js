const EmpData = require("./EmpData");
const cTable = require("console.table");
const inquirer = require("inquirer");

const empData = new EmpData();

// Prompt user for information
const promptUser = (questions) => {
  return inquirer.prompt(questions);
};

// Add Employees
const addEmployee = async () => {
  try {
    const [roles, employees] = await Promise.all([
      empData.getRoles(),
      empData.getEmployees(),
    ]);

    const newEmp = await promptUser([
      {
        type: "input",
        message: "Enter the name of the employee's first name:",
        name: "empFirst",
      },
      {
        type: "input",
        message: "Enter the name of the employee's last name:",
        name: "empLast",
      },
      {
        name: "empRole",
        type: "list",
        choices: function () {
          const choiceArray = [];
          roles.forEach((role) => {
            const roleObj = {
              name: role.title,
              value: role.id,
            };
            choiceArray.push(roleObj);
          });
          return choiceArray;
        },
        message: "Choose the employee's role:'",
      },
      {
        name: "empMgr",
        type: "list",
        choices: function () {
          const choiceArray = [{ name: "None", value: -1 }];
          employees.forEach((employee) => {
            const mgrObj = {
              name: employee.first_name + " " + employee.last_name,
              value: employee.id
            };
            choiceArray.push(mgrObj);
          });
          return choiceArray;
        },
        message: "Choose the employee's manager:",
      },
    ]);

    await empData.createEmployee(newEmp);
    console.log(`\n${newEmp.empFirst} ${newEmp.empLast} added!`);

  } catch (err) {
    console.log(err);
  }
};

// Add Department
const addDepartment = async () => {
  try {
    const newDepart = await promptUser([
      {
        type: "input",
        message: "Enter the name of the new department:",
        name: "deptName",
      },
    ]);

    await empData.createDepartment(newDepart);
    console.log(`${newDepart.deptName} department added!`);

  } catch (err) {
    console.log(err);
  }
};

// Add Role
const addRole = async () => {
    try {
        const departments = await empData.getDepartments();
        const newRole = await promptUser([
            {
                type: "input",
                message: "Enter the title of the new role:",
                name: "roleTitle"
            },
            {
                type: "input",
                message: "Eneter the salary for this role:",
                name: "roleSalary",
                validate: function (salary) {
                    const valid = /\d+/.test(salary)
                    if (valid) {
                        return true;
                    } else {
                        return "Please enetr a valid number!";
                    }
                }
            },
            {
                name: "roleDept",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    departments.forEach((dept) => {
                        const depObj = {
                            name: dept.department,
                            value: dept.id
                        }
                        choiceArray.push(depObj)
                    })
                    return choiceArray;
                },
                message: "Which department does this role belong to?:"
            },
        ]);

        await empData.createRole(newRole);
        console.log(`${newRole.roleTitle} role added`);

    } catch (err) {
        console.log(err);
    }
}

module.exports = { addEmployee, addDepartment, addRole}