const mysql = require('mysql2');
const initialize = require('../index.js');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'company',
    },
    console.log('Connected to company database'),
); 

module.exports = db;