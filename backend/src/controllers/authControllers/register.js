const authModel = require("../../models/authModel");
const { jwt } = require("../../../jwt");
const uuid = require("uuid");

const register = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  try {
    const { first_name, last_name, password, email, phone_number } = req.body;

    if (!first_name || !last_name || !password || !email) {
      return res.status(400).json({ error: "All fields must be filled in" });
    }

    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const payload = {
      first_name: first_name,
      last_name: last_name,
    };

    const existingUser = await authModel.findExisting(email);

    if (existingUser) {
      return res.status(400).json({
        error: "User with this name already exists",
        details: existingUser.message,
      });
    }

    const newUser = await authModel.createUser(
      first_name,
      last_name,
      password,
      email,
      phone_number
    );

    if (newUser) {
      const token = jwt.createToken(header, payload);
      return res.status(201).json({
        message: "Operation to add a new user was successful",
        token,
      });
    } else {
      return res.status(500).json({
        error: "Operation to add a new user failed",
        details: error.message,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Operation has failed", details: error.message });
  }
};

module.exports = register;
