const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "90@sqlwindows",
  database: "infinohop",
});

module.exports = pool;
