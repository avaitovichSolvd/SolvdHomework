const database = require("../../db/DBkey");

const userModel = {
  getUserList: async () => {
    const sql = "SELECT * FROM user";
    try {
      const [results, fields] = await database.promise().query(sql);
      return results;
    } catch (err) {
      throw err;
    }
  },

  deleteUser: async (id) => {
    const sql = "DELETE FROM user WHERE id = ?";

    const values = [id];

    try {
      const [result] = await database.promise().query(sql, values);
      return result.affectedRows === 1;
    } catch (err) {
      throw err;
    }
  },

  addToFavorite: async (user_id, lawyer_id) => {
    const sql = "INSERT INTO favorites (user_id, lawyer_id) VALUES (?, ?)";
    const values = [user_id, lawyer_id];

    try {
      const [result] = await database.promise().query(sql, values);
      return result.affectedRows;
    } catch (err) {
      throw err;
    }
  },

  getFavoritesList: async (user_id) => {
    const sql =
      "SELECT l.id, l.first_name, l.last_name, l.phone_number, l.email, l.branch_of_law, l.description, l.rate, l.budget FROM favorites uc JOIN lawyer l ON uc.lawyer_id = l.id WHERE uc.user_id = ?";
    const values = [user_id];

    try {
      const [result] = await database.promise().query(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  },

  removeFavorite: async (user_id, lawyer_id) => {
    const sql = "DELETE FROM favorites WHERE user_id = ? AND lawyer_id = ?";
    const values = [user_id, lawyer_id];

    try {
      const [result] = await database.promise().query(sql, values);
      return result.affectedRows;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = userModel;
