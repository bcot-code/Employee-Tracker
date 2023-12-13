import express from "express";
import mysql from "mysql2";
import inquirer from "inquirer";
//highlights the typset
import chalk from "chalk";
//set EMPLOYEE TITLE
import figlet from "figlet";

const PORT = process.env.PORT || 3001;
const app = express();

//Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to database
const db = mysql.createConnection({
  host: "localhost",
  user: "barbara",
  password: "password",
  database: "employees_db",
});
db.connect((err) => {
  if (err) throw err;
  console.log(
    chalk.yellow.bold(
      `++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`
    )
  );
  console.log("");
  console.log(chalk.greenBright.bold(figlet.textSync("Employee Tracker")));
  console.log("");
  console.log(
    chalk.yellow.bold(
      `++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`
    )
  );
  //Start server
  start();
});
//Questions
function start() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update an employee role",
        "Add Manager",
        "Delete Role",
        "Quit",
      ],
      message: "What you like to do",
      name: "options",
    })
    .then((answer) => {
      console.log(`You enter ` + answer.options);
      switch (answer.options) {
        case "View all Departments":
          viewAllDepartments();
          break;
        case "View all Roles":
          viewAllRoles();
          break;
        case "View all Employees":
          viewAllEmployees();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Add Manager":
          addManager();
          break;
        case "Delete a Role":
          deleteRole();
        default:
          quit();
      }
    });
}
// Functions to display below
function viewAllDepartments() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.log(
      chalk.white.bold(
        `+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`
      )
    );
    console.log(
      `                                                               ` +
        chalk.yellow.bold(`View all Departments:`)
    );
    console.log(
      chalk.white.bold(
        `+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`
      )
    );
    console.table(res);
    start();
  });
}
//VIEW ALL ROLES
function viewAllRoles() {
  let sql = `SELECT * FROM role`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}
//NOT SHOWING
function viewAllEmployees() {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.log(
      chalk.white.bold(
        `+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`
      )
    );
    console.log(
      `                                                               ` +
        chalk.yellow.bold(`View all Employees:`)
    );
    console.table(res);
    start();
  });
}
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
//WORKS
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department?",
      name: "nameCreate",
    })
    .then((answer) => {
      const sql = `INSERT INTO department (name) VALUE (?)`;
      db.query(sql, answer.nameCreate, (err, res) => {
        if (err) throw err;
        console.log(``);
        console.log(
          chalk.greenBright(answer.nameCreate + ` successfully added!`)
        );
        console.log(``);
        start();
      });
    });
}
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
//WORKS
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the title of the role you want to add:",
        name: "roleTitle",
      },
      {
        type: "input",
        message: "Enter the salary of the role you want to add:",
        name: "roleSalary",
      },
      {
        type: "input",
        message: "Enter the department ID of the role you want to add:",
        name: "roleDepartmentId",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
      db.query(
        sql,
        [answer.roleTitle, answer.roleSalary, answer.roleDepartmentId],
        (err, res) => {
          if (err) throw err;
          console.log(`Role successfully added!`);
          start();
        }
      );
    });
}

//WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
//WORKS
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstNm",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastNm",
      },
      {
        type: "input",
        message: "What is the employee's role ID?",
        name: "roleId1",
      },
      {
        type: "input",
        message: "What is the employee's manager ID?",
        name: "managerId1",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
      db.query(
        sql,
        [answer.firstNm, answer.lastNm, answer.roleId1, answer.managerId1],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
// == needs to be fixed
//You have tried to call .then(), .catch(), or invoked await on the result of query that is not a promise, which is a programming error. Try calling con.promise().query(), or require('mysql2/promise') instead of 'mysql2' for a promise-compatible version of the query interface. To learn how to use async/await or Promises check out documentation at https://www.npmjs.com/package/mysql2#using-promise-wrapper, or the mysql2 documentation at https://github.com/sidorares/node-mysql2/tree/master/documentation/en/Promise-Wrapper.md
function updateEmployeeRole() {
  let sql = `
    SELECT employee.id, employee.first_name, employee.last_name, employee.role_id 
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id
  `;

  db.query(sql, (err, res) => {
    if (err) throw err;

    let employees = res;
    let roles = res;

    console.log("Choose which employee you would like to update");

    const empList = employees.map((employee) => ({
      value: employee.id,
      name: `${employee.first_name} ${employee.last_name}`,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee's role do you want to update?",
          name: "employeeRole",
          choices: empList,
        },
        {
          type: "list",
          message: "Which role do you want to assign the selected employee?",
          name: "newRole",
          choices: roles.map((role) => ({
            value: role.id,
            name: role.title,
          })),
        },
      ])
      .then((answers) => {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

        db.query(
          sql,
          [answers.newRole, answers.employeeRole],
          (err, result) => {
            if (err) throw err;

            console.log(`${result.affectedRows} record(s) updated`);
            console.log(
              `The role has been updated for the employee with ID=${answers.employeeRole}.`
            );

            start();
          }
        );
      });
  });
}

//  BONUS add & delete...
//ALMOST SHOWING
function addManager() {
  const queryDeptS = "SELECT * FROM department";
  const queryEmployees = "SELECT * FROM employee";

  db.query(queryDeptS, (err, resDepts) => {
    if (err) throw err;

    db.query(queryEmployees, (err, resEmployees) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            type: "list",
            name: "dept",
            message: "Select the department: ",
            choices: resDepts.map((department) => department.name),
          },
          {
            type: "list",
            name: "employee",
            message: "Select the employee to add a manager to:",
            choices: resEmployees.map(
              (employee) => `${employee.first_name} ${employee.last_name}`
            ),
          },

          {
            type: "list",
            name: "manager",
            message: "Select the employee's manager: ",
            choices: resEmployees
              .map((employee) => `${employee.first_name} ${employee.last_name}`)
              .concat("None"),
          },
        ])
        .then((answers) => {
          const department = resDepts.find(
            (department) => department.name === answers.dept
          );
          const employee = resEmployees.find(
            (employee) =>
              `${employee.first_name} ${employee.last_name}` ===
              answers.employee
          );
          const manager = resEmployees.find(
            (employee) =>
              `${employee.first_name} ${employee.last_name}` ===
              `Manager: ${answers.manager}`
          );

          let sql =
            "UPDATE employee SET manager_id = ? WHERE id = ? AND role_id IN (SELECT id FROM role WHERE department_id = ?)";

          if (answers.manager === "None") {
            sql = "UPDATE employee SET manager_id = NULL WHERE id = ?";
          }

          db.query(
            sql,
            answers.manager === "None"
              ? [employee.id]
              : [manager.id, employee.id, department.id],
            (err, res) => {
              if (err) throw err;

              console.log(
                `${employee.first_name} has been added as a manager for ${department.name}.`
              );

              start();
            }
          );
        });
    });
  });
}

function deleteRole() {
  //get a list of all roles and ask user to pick one they wish to remove
  db.query(`SELECT title FROM role`, (err, data) => {
    if (err) throw err;
    const rolesList = data.map((role) => role.title).join("\n");
    inquirer
      .prompt({
        name: "removeThisRole",
        type: "list",
        message: "Which role would you like to remove?\n" + rolesList,
      })
      .then((answer) => {
        const chosenRole = answer.removeThisRole;
        const queryString = `DELETE FROM role WHERE title='${chosenRole}'`;
        db.query(queryString, (err, result) => {
          if (err) throw err;
          console.log(`The ${chosenRole} role has been removed.`);
          start();
        });
      });
  });
}
// Quit application
function quit() {
  db.end();
}

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
