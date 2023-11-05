const register = require("./register");
const login = require("./login")

const authController = {
  register: register,
  login: login,
};

module.exports = authController;
