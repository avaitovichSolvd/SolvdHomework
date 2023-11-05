const authModel = require("../../models/authModel");
const jwt = require("../../../jwt");
const uuid = require("uuid");

const secretKey = uuid.v4();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields must be filled in" });
    }

    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const user = await authModel.loginUser(email, password);

    if (user.length === 1) {
      const userData = user[0];
      const payload = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
      };

      const token = jwt(secretKey, header, payload);
      return res.status(200).json({
        message: "Operation to add a new user was successful",
        token,
      });
    } else {
      return res
        .status(401)
        .json({ error: "Invalid email or password"});
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Operation has failed", details: error.message });
  }
};

module.exports = login;
