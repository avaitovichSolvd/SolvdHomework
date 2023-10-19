const express = require('express');
const app = express();
const mysql = require('mysql2')
const bodyparser = require('body-parser')

const port = process.env.PORT || 3000;
;

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'w%2npu9^Nm&Ys!H',
  database: 'solvdLawDB'
})

app.use(bodyparser.json())

app.post("/api/register", (req, res) => {
  try{
    const {username, password} = req.body

    if(!username || !password) {
      return res.status(400).json({error: "All fields must be filled in"})
    }

    const checkExisting = "SELECT * FROM users WHERE username = ?"
    db.query(checkExisting, [username], (err, result) => {
      if(err){
        return res.status(500).json({error: "Checking failed"})
      }
      if(result.length > 0) {
        return res.status(400).json({error: "User with this name already exist"})
      }

      const newUser = "INSERT INTO users (username, password) VALUES (?, ?)"
      db.query(newUser, [username, password], (err, results) => {
        if (err) {
          return res.status(500).json({error: "Operation adding new user has failed"})
        }
        return res.status(201).json({message: "Operation add new user went succsesful"})
      })
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: "Operation has failed"})
  }
})

app.listen(port, () => {
  console.log(`Server started ${port}`);
});