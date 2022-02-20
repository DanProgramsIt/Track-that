const EmpData = require("./EmpData");
const cTable = require("console.table");
const inquirer = require("inquirer");

// New EmpData db object to access SQL query
const empData = new EmpData();

// Prompt user for information
const promptUser = (questions) => {
    return inquirer.prompt(questions);
};

// Delete an employee
const delEmployee = async () => {
    try {
        const employees = await empData.getEmployees()
        const deleteEmp = await promptUser([
            {
                name: "empId",
                type: "list",
                choices: function () {
                    const choicesArr = [];
                    employees.forEach((emp) => {
                        const empObj = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id
                        }
                        choicesArr.push(empObj)
                    })
                    return choicesArr;
                },
                message: "Which employee would you like to remove?"
            },
        ]);

        // To determin if the emplyee is a manager
        const [directReports, empToRemove] = await Promise.all([empData.getEmployeesWithManager(deleteEmp.empId), empData.getEmployeeById(deleteEmp.empId)])

        const confirm = await promptUser([
            {
                name: "yN",
                type: "confirm",
                default: false,
                message: `\nAre you sure you want to delete ${empToRemove[0].first_name} ${empToRemove[0].last_name}? They Will Be Gone Forever!!!`
            }
        ]);
        if (confirm.yN) {
            directReports.forEach(async (emp) => {
                try {
                    await empData.updateEmpMgr(null, emp.id)
                } catch (err) {
                    console.log(err);
                }
            })

            await empData.remove("employee", deleteEmp.empId)
            console.log(`\n${empToRemove[0].first_name} ${empToRemove[0].last_name} has been deleted successfully`)
        }
    } catch (err) {
        console.log(err)
    }
}

// Delete department
const delDepartment = async () => {
    try {
        const departments = await empData.getDepartments();
        const remove = await promptUser([
            {
                name: "deptId",
                type: "list",
                choices: function () {
                    const choicesArr = [];
                    departments.forEach((dept) => {
                        const deptObj = {
                            name: dept.department,
                            value: dept.id
                        }
                        choicesArr.push(deptObj)
                    })
                    return choicesArr;
                },
                message: "Which department would you like to delete?"
            },
        ]),
        // Search for roles in this department
        const deptRoles = await empData.getRolesByDept(remove.deptId);

        if (deptRoles.length) {
            console.log("\n================================\n")
            console.log("WARNING!: This department contains roles that in use:")
            deptRoles.forEach((role) => {
                console.log(role.title)
            })
            console.log("If you delete this department, all roles and employees in this department will also be DELETED!")
            console.log("\n================================\n")
        }
        const removeDept = await empData.getDeptById(remove.deptId);

        const confirm = await promptUser([
            {
                name: "yN",
                type: "confirm",
                default: false,
                message: `\nAre you sure you want to remove ${removeDept[0].department}? They Will Be Gone Forever!!!`
            }
        ]);
        if (confirm.yN) {
            await empData.remove("department", remove.deptId)
            console.log(`\n${removeDept[0].department} department has been deleted successfully`)
        }
    } catch (err) {
        console.log(err)
    }
}

// Delete a role
const delRole = async () => {
    try {
        const roles = await empData.getRoles();
        const remove = await promptUser([

            {
                name: "roleId",
                type: "list",
                choices: function () {
                    const choiceArr = [];
                    roles.forEach((role) => {
                        const roleObj = {
                            name: role.title,
                            value: role.id
                        }
                        choiceArr.push(roleObj)
                    })
                    return choiceArr;
                },
                message: "Which role would you like to remove?"
            },

        ]);

        // Search for employees with this role
        const roleEmps = await empData.getEmployeesByRole(remove.roleId);
        if (roleEmps.length) {
            console.log("\n================================\n")
            console.log("WARNING!: This role is assigned to active employees:")
            roleEmps.forEach((emp) => {
                console.log(`${emp.first_name} ${emp.last_name}`)
            })
            console.log("If you delete this role, all employees assigned to this role will also be DELETED!")
            console.log("\n================================\n")
        }

        const removeRole = await empData.getDeptById(remove.roleId);

        const confirm = await promptUser([
            {
                name: "yN",
                type: "confirm",
                default: fasle,
                message: `\nAre yoo sure want to delete ${removeRole[0].title}? They Will Be Gone Forever!!!`
            }
        ]);
        if (confirm.yN) {
            await empData.remove("role", remove.roleId)
            console.log(`\n${removeRole[0].title} role has been deleted.`)
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = { delDepartment, delEmployee, delRole }