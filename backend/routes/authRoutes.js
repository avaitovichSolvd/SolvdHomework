const express = require("express");
const router = express.Router();
const database = require("../db/DBkey");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const uuid = require('uuid');

router.use(bodyparser.json());

const secretKey = uuid.v4();

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "All fields must be filled in" });
    }

    const checkExisting = "SELECT * FROM user WHERE username = ?";
    const [existingUsers] = await database
      .promise()
      .query(checkExisting, [username]);

    if (existingUsers.length > 0) {
      return res
        .status(400)
        .json({ error: "User with this name already exists" });
    }

    const newUser = "INSERT INTO user (username, password) VALUES (?, ?)";
    const [results] = await database
      .promise()
      .query(newUser, [username, password]);

    if (results.affectedRows === 1) {
      const token = jwt.sign({ username }, secretKey);
      return res
        .status(201)
        .json({ message: "Operation to add a new user was successful", token });
    } else {
      return res
        .status(500)
        .json({ error: "Operation to add a new user failed" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Operation has failed" });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "All fields must be filled in" });
    }

    const userQuery = "SELECT * FROM user WHERE username = ? AND password = ?";
    const [user] = await database
      .promise()
      .query(userQuery, [username, password]);

    if (user.length === 1) {
      const token = jwt.sign({ username }, secretKey);
      return res.status(200).json({ message: "Sign In successful", token });
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Operation has failed" });
  }
};

const getUsers = async (req, res) => {
  try {
    const getUsersQuery = "SELECT * FROM user";
    const [results, fields] = await database.promise().query(getUsersQuery);

    return res.status(200).json({ users: results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};

router.post("/api/SignUp", signUp);
router.post("/api/SignIn", signIn);
router.get("/api/users", getUsers);

module.exports = router;