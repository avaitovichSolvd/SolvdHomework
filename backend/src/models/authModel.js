const database = require("../../db/DBkey");

const authModel = {
  createUser: async (first_name, last_name, password, email, phone_number) => {
    const sql =
      "INSERT INTO user (first_name, last_name, password, email, phone_number) VALUES (?, ?, ?, ?, ?)";
    const values = [first_name, last_name, password, email, phone_number];

    try {
      const [result] = await database.promise().query(sql, values);
      return result.affectedRows === 1;
    } catch (err) {
      return false;
    }
  },

  findExisting: async (email) => {
    const sql = "SELECT * FROM user WHERE email = ?";
    const values = [email];

    try {
      const [result] = await database.promise().query(sql, values);
      return result[0];
    } catch (err) {
      return null;
    }
  },

  loginUser: async (email, password) => {
    const sql = "SELECT * FROM user WHERE email = ? AND password = ?";
    const values = [email, password];

    try {
      const [result] = await database.promise().query(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = authModel;
