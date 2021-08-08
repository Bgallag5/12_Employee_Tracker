const { moduleExpression } = require("@babel/types");
const inquirer = require("inquirer");
// const db = require('./db/connection');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
      host: 'localhost',
      user: 'root',
      password: 'bentasmo22',
      database: 'company',
  },
  console.log('Connected to company database'),
); 

db.connect(err => {
  if (err) console.log(err);
  initialize();
});



function initialize () {
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
        "Update Employee"
      ]
    })
    .then((response) => {
      if(response.start === 'View all Departments'){
        getDepartments();
      }
      else if (response.start == "View all Employees"){
          console.log('EMPLOYEEEEEES');
      }
    });
};


////FUNCTIONS

function getDepartments() {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(rows)
  });
};






module.exports = initialize;