const express = require("express");
const router = express.Router();
const database = require("../../db/DBkey");
const bodyParser = require("body-parser");

router.use(bodyParser.json());


const addEvent = async (req, res) => {
  try {
    const { id_lawyer, username, event_date, event_description } = req.body;

    const dbConfig = {
      host: "localhost",
      user: "root",
      password: "w%2npu9^Nm&Ys!H",
      database: "solvdLawDB",
  };

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection(dbConfig);


    const sql = `INSERT INTO calendar_events (id_lawyer, username, event_date, event_description) VALUES (?, ?, ?, ?)`;
    const values = [id_lawyer, username, event_date, event_description];

    const [result] = await connection.query(sql, values);

    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create event", details: error.message });
  }
};

const getEventList = async (req, res) => {
  try {
    const { id_lawyer, username } = req.query;

    let sql = "SELECT * FROM calendar_events WHERE 1=1";
    const values = [];

    if (id_lawyer) {
      sql += " AND id_lawyer = ?";
      values.push(id_lawyer);
    }

    if (username) {
      sql += " AND username = ?";
      values.push(username);
    }

    const [events] = await database.promise().query(sql, values);

    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve events" , details: error.message});
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { event_id } = req.params;

    const sql = "DELETE FROM calendar_events WHERE event_id = ?";
    const values = [event_id];

    const [result] = await database.promise().query(sql, values);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Event not found" });
    } else {
      res.status(200).json({ message: "Event deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete event", details: error.message });
  }
};

const eventNotification = async (req, res) => {
  try {
    const { user_chat, lawyer_chat, event_id, sender_type } = req.body;

    const findEventSql =
      "SELECT event_date, event_description, id_lawyer, username FROM calendar_events WHERE event_id = ?";
    const [eventDetails] = await database.promise().query(findEventSql, [event_id]);

    if (eventDetails.length === 0) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    const { event_date, event_description, id_lawyer, username } =
      eventDetails[0];

    const eventDetailsObject = {
      date: event_date,
      description: event_description,
      lawyer: id_lawyer,
      client: username,
    };
    const message_text = JSON.stringify(eventDetailsObject);
    const insertMessageSql =
      "INSERT INTO chat_messages (user_chat, lawyer_chat, message_text, sender_type) VALUES (?, ?, ?, ?)";
    const values = [user_chat, lawyer_chat, message_text, sender_type];

    const [result] = await database.promise().query(insertMessageSql, values);

    res
      .status(201)
      .json({ message: "Event details sent to chat successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send event details to chat", details: error.message });
  }
};

router.post("/api/AddEvent", addEvent);
router.get("/api/GetEventList", getEventList);
router.delete("/api/DeleteEvent/:event_id", deleteEvent);
router.post("/api/EventNotificationToChat", eventNotification);

module.exports = router;
