const database = require("../../db/DBkey");

const chatModel = {
  sendMessage: async (user_id, lawyer_id, message_text, sender_type) => {
    const sql =
      "INSERT INTO chat_messages (user_id, lawyer_id, message_text, sender_type) VALUES (?, ?, ?, ?)";
    const values = [user_id, lawyer_id, message_text, sender_type];

    try {
      const [result] = await database.promise().query(sql, values);
      return result.affectedRows === 1;
    } catch (err) {
      throw err;
    }
  },

  getChat: async (user_id, lawyer_id) => {
    const sql =
      "SELECT * FROM chat_messages WHERE (user_id = ? AND lawyer_id = ?) OR (user_id = ? AND lawyer_id = ?) ORDER BY timestamp";
    const values = [user_id, lawyer_id, user_id, lawyer_id];

    try {
      const [result] = await database.promise().query(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  },

  deleteChat: async (user_id, lawyer_id) => {
    const sql =
      "DELETE FROM chat_messages WHERE (user_id = ? AND lawyer_id = ?)";
    const values = [user_id, lawyer_id];
    try {
      const result = await database.promise().query(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = chatModel;
