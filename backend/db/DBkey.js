const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "w%2npu9^Nm&Ys!H",
    database: "solvdLawDB",
});

module.exports = db