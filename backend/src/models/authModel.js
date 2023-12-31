const database = require("../../db/DBkey");

const authModel = {
  createUser: async (first_name, last_name, password, email, phone_number) => {
    const sql =
      "INSERT INTO user (first_name, last_name, password, email, phone_number) VALUES (?, ?, ?, ?, ?)";
    const values = [first_name, last_name, password, email, phone_number];

    try {
      const [result] = await database.promise().query(sql, values);
      if (result.affectedRows === 1) {
        const userId = result.insertId;
        return { user_id: userId, first_name, last_name, email, phone_number };
      }
    } catch (err) {
      return false;
    }
  },

  findExisting: async (email) => {
    const sql =
      "SELECT user_id, first_name, last_name, password, phone_number, email FROM user WHERE email = ?";
    const values = [email];

    try {
      const [result] = await database.promise().query(sql, values);
      return result[0];
    } catch (err) {
      return null;
    }
  },

  loginUser: async (email, password) => {
    const sql =
      "SELECT user_id, first_name, last_name, password, phone_number, email FROM user WHERE email = ? AND password = ?";
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
