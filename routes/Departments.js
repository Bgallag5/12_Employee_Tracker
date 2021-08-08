// const express = require("express");
// const router = express.Router();
// const db = require("../db/connection");

// ///GET ALL DEPARTMENTS
// const getDepartments = function () {
//   const sql = `SELECT * FROM departments`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     console.table(rows);
//   });
// };

// ////ADD DEPARTMENTS

// module.exports = getDepartments;
