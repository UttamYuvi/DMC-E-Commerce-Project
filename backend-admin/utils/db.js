const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "manager",
  database: "infinohop",
});

module.exports = pool;
