const { moduleExpression } = require("@babel/types");
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
        "Remove Employee",
        "Update Employee",
      ],
    })
    .then((response) => {
      if (response.start === "View all Departments") {
        getDepartments();
      } 
      else if (response.start == "View all Employees") {
        getEmployees();
      }
      else if (response.start == "View all Roles") {
        getRoles();
      }
      else if (response.start == "Add Employee") {
        addEmployee();
      }
      else if (response.start == "Remove Employee") {
      }
      else if (response.start == "Update Employee") {
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

function getEmployees(){
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    initialize();
  });
}

function getRoles(){
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

////UPDATE FUNCTIONS
////prompt to get new employee info, get employee table, add to employee table, show table 
function addEmployee(){
inquirer.prompt([
  {
    name: "first",
    type: 'input',
    message: "What is this employee's first name? (required)",
  },
  {
    name: "last",
    type: 'input',
    message: "What is this employee's last name? (required)",
  },
  {
    name: 'manager',
    type: 'input',
    message: "Who is this employee's manager? (required)",
  },
  {
    name: 'role',
    type: 'number',
    message: "What is this employee's role?",
    choices: 
    [
      1,
      "Accountant",
      "Salesman",
      "Intern",
    ],
  },
]).then(response =>{
  console.log(response);
  // const {first, last, manager, role} = response;
  // console.log(first, last, role);

  // const sql = `INSERT INTO employee SET ?`, {
  //   first_name: response.first,
  //   last_name: response.last,
  //   manager_id: manager,
  //   role_id: role,
  // }
  db.query(`INSERT INTO employees SET ?`, {
    first_name: response.first,
    last_name: response.last,
    manager_id: response.manager,
    role_id: response.role,
  }, (err, rows) =>{
    if (err){
      console.log(err);
    }
    console.table(rows)
    initialize();
  })
});
}


















// module.exports = initialize;


















//////NOTES/////////
////delete connection.js BUT re-modularize routes.js