const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YCABtPLrKbCk",
    database: "solvdLawDB",
});

module.exports = db