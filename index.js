const { moduleExpression } = require("@babel/types");
const { response } = require("express");
const inquirer = require("inquirer");
const { runCLI } = require("jest");
// const db = require('./db/connection');
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "bentasmo22",
    database: "company",
  },
  console.log("Connected to company database")
);

db.connect((err) => {
  if (err) console.log(err);
  initialize();
});

function initialize() {
  inquirer
    .prompt({
      name: "start",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all Departments",
        "View all Employees",
        "View all Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee",
        "Delete Employee",
      ],
    })
    .then((response) => {
      if (response.start === "View all Departments") {
        getDepartments();
      } else if (response.start == "View all Employees") {
        getEmployees();
      } else if (response.start == "View all Roles") {
        getRoles();
      } else if (response.start == "Add Employee") {
        addEmployee();
      } else if (response.start == "Add Department") {
        addDepartment();
      } else if (response.start == "Update Employee") {
        updateEmployee();
      } else if (response.start == "Delete Employee") {
        deleteEmployee();
      } else if (response.start == "Add Role") {
        addRole();
      }
    });
}

////GET FUNCTIONS

function getDepartments() {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    initialize();
  });
}

function getEmployees() {
  const sql = `SELECT employees.first_name AS first, employees.last_name AS last, roles.job AS role, roles.salary AS salary, employees.manager_id AS manager_id FROM employees LEFT JOIN roles ON employees.role_id = roles.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    initialize();
  });
}

function getRoles() {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    initialize();
  });
}

///ADD EMPLOYEE
////function to get new employee info, get employee table, add to employee table, show table
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "What is this employee's first name? (required)",
      },
      {
        name: "last",
        type: "input",
        message: "What is this employee's last name? (required)",
      },
      {
        name: "manager",
        type: "number",
        message: "What is this employee's manager's ID? (required)",
      },
      {
        name: "role",
        type: "rawlist", //make a number and connect to role
        message: "What is this employee's role?",
        choices: ["Attorney", "Accountant", "Salesman", "Intern", "Manager"],
      },
    ])
    .then((response) => {
      console.log(response);
      // const {first, last, manager, role} = response;
      // console.log(first, last, role);
      const role = assignRole(response.role);
      console.log(role);
      db.query(
        `INSERT INTO employees SET ?`,
        {
          first_name: response.first,
          last_name: response.last,
          manager_id: response.manager,
          role_id: role,
        },
        (err, rows) => {
          if (err) {
            console.log(err);
          }
          console.table(rows);
          initialize();
        }
      );
    });
}

////ADD DEPARTMENT

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "dep",
        type: "input",
        message: "What is the new department's name? (required)",
      },
    ])
    .then((response) => {
      console.log(response);
      console.log(response.dep);
      db.query(
        `INSERT INTO departments SET ?`,
        {
          dep_name: response.dep,
        },
        (err, rows) => {
          if (err) {
            console.log(err);
          }
          console.table(rows);
          initialize();
        }
      );
    });
}

////ADD ROLE
function addRole() {
  db.query(`SELECT * FROM departments`, (err, data) => {
    console.log(data);

    inquirer
      .prompt([
        {
          name: "role",
          type: "input",
          message: "What is the name of the new role?",
        },
        {
          name: "salary",
          type: "number",
          message: "What is this position's salary?",
        },
        {
          name: "dep",
          type: "number",
          message: "What is the department id for this role?",
        },
      ])
      .then((response) => {
        const sql = `INSERT INTO roles (job, salary, dep_id)
VALUES (?, ?, ?);`;

        const params = [response.role, response.salary, response.dep];

        db.query(sql, params, (err, data) => {
          if (err) console.log(err);
          console.log(data);
          initialize();
        });
      });
  });
}

////UPDATE EMPLOYEE ROLE
function updateEmployee() {
  const sql = `SELECT A.job, B.first_name FROM roles A LEFT JOIN employees B ON A.id = B.role_id`;

  db.query(sql, (err, data) => {
    if (err) console.log(err);
    console.log(data);

    inquirer
      .prompt([
        {
          name: "employee",
          type: "list",
          message: "Which employee whould you like to update?",
          choices: () => {
            let myEmployees = [];
            for (let i = 0; i < data.length; i++) {
              let name = data[i].first_name;
              myEmployees.push(name);
            }
            console.log(myEmployees);
            return myEmployees;
          },
        },
        {
          name: "role",
          type: "list",
          message: "What is this employee's new role?",
          choices: () => {
            let roles = [];
            for (let i = 0; i < data.length; i++) {
              let role = data[i].job;
              if (!roles.includes(role)) roles.push(role);
            }
            console.log(roles);
            return roles;
          },
        },
      ])
      .then((response) => {
        console.log(response);
        let name = response.employee;
        let role = assignRole(response.role);
        console.log(role);
        /////////use assignRole func to tie role name to role id use params
        const sql = `UPDATE employees SET ? WHERE ?`;
        ////NOTE to self: params pass in as single array
        db.query(
          sql,
          [{ role_id: role }, { first_name: name }],
          (err, data) => {
            if (err) throw err;
            console.log(data);
            initialize();
          }
        );
      });
  });
}

///DELETE EMPLOYEE
function deleteEmployee() {
  db.query(`SELECT * FROM employees`, (err, data) => {
    console.log(data);
    inquirer
      .prompt({
        name: "employee",
        type: "list",
        message: "Which employee whould you like to delete?",
        choices: () => {
          let myEmployees = [];
          for (let i = 0; i < data.length; i++) {
            let name = data[i].first_name;
            myEmployees.push(name);
          }
          console.log(myEmployees);
          return myEmployees;
        },
      })
      .then((response) => {
        console.log(response);
        let params = response.employee;
        db.query(
          `DELETE FROM employees WHERE first_name = ?`,
          params,
          (err, data) => {
            if (err) {
              console.log(err);
            }
            console.table(data);
            console.log("Employee has been deleted");
            initialize();
          }
        );
      });
  });
}

const assignRole = function (data) {
  console.log(data);
  if (data === "Attorney") {
    return 1;
  } else if (data === "Accountant") {
    return 2;
  } else if (data === "Salesman") {
    return 3;
  } else if (data === "Intern") {
    return 4;
  } else if (data === "Manager") {
    return 5;
  }
};

// module.exports = initialize;

//////NOTES/////////
////GET all Employees needs job titles, salaries,
////modularize to learn how to do it???
