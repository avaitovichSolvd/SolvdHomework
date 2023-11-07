const database = require("../../db/DBkey");

const calendarModel = {
  addEvent: async (lawyer_id, user_id, event_date, event_description) => {
    const sql =
      "INSERT INTO calendar_events (lawyer_id, user_id, event_date, event_description) VALUES (?, ?, ?, ?)";
    const values = [lawyer_id, user_id, event_date, event_description];

    try {
      const [result] = await database.promise().query(sql, values);
      return result.affectedRows === 1;
    } catch (err) {
      throw err;
    }
  },

  getEvents: async (lawyer_id, user_id) => {
    let sql = "SELECT * FROM calendar_events WHERE 1=1";
    const values = [];

    if (lawyer_id) {
      sql += " AND lawyer_id = ?";
      values.push(lawyer_id);
    }

    if (user_id) {
      sql += " AND user_id = ?";
      values.push(user_id);
    }

    try {
      const [result] = await database.promise().query(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  },

  deleteEvent: async (event_id) => {
    const sql = "DELETE FROM calendar_events WHERE event_id = ?";
    const values = [event_id];

    try {
      const [result] = await database.promise().query(sql, values);
      return result.affectedRows === 1;
    } catch (err) {
      throw err;
    }
  },

  findEvent: async (event_id) => {
    const sql =
      "SELECT event_date, event_description, lawyer_id, user_id FROM calendar_events WHERE event_id = ?";
    const values = [event_id];

    try {
      const [result] = await database.promise().query(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = calendarModel;
