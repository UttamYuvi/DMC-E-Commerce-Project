const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "902sqlwindows",
    database: "infinohop",
});

module.exports = pool;