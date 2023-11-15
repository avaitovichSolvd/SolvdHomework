const mysql = require("mysql2");
/* global process */
console.log("NODE_ENV:", process.env.NODE_ENV);

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.NODE_ENV === "test" ? "testDB" : "solvdLawDB",
});

module.exports = db;
