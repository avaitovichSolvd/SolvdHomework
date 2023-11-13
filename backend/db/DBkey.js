const mysql = require("mysql2");

// const dbName = process.env.NODE_ENV === 'test' ? 'testDB' : 'solvdLawDB';
// const dbHost = process.env.NODE_ENV === 'test' ? 'localhost' : 'mysql-container';

const db = mysql.createConnection({
  host: process.env.NODE_ENV === 'test' ? 'localhost' : 'mysql-container',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? 'testDB' : 'solvdLawDB',
});

module.exports = db;

