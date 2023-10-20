const express = require('express');
const app = express();
const mysql = require('mysql2')
const bodyparser = require('body-parser')

const port = process.env.PORT || 3000;
;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'w%2npu9^Nm&Ys!H',
  database: 'solvdLawDB'
})

app.use(bodyparser.json())

app.post("/api/register", async (req, res) => {
  try{
    const {username, password} = req.body

    if(!username || !password) {
      return res.status(400).json({error: "All fields must be filled in"})
    }

    const checkExisting = "SELECT * FROM user WHERE username = ?"
    const [existingUsers] = await db.promise().query(checkExisting, [username]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "User with this name already exists" });
    }

    const newUser = "INSERT INTO user (username, password) VALUES (?, ?)";
    const [results] = await db.promise().query(newUser, [username, password]);

    if (results.affectedRows === 1) {
      return res.status(201).json({ message: "Operation to add a new user was successful" });
    } else {
      return res.status(500).json({ error: "Operation to add a new user failed" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Operation has failed" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const getUsersQuery = "SELECT * FROM user";
    const [results, fields] = await db.promise().query(getUsersQuery);

    return res.status(200).json({ users: results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
});


app.listen(port, () => {
  console.log(`Server started ${port}`);
});