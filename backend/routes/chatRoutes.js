const express = require("express");
const router = express.Router();
const database = require("../db/DBkey");
const bodyparser = require("body-parser");

router.use(bodyparser.json());

const sendMessages = async (req, res) => {
  try {
    const { sender_id, receiver_id, message_text } = req.body;

    const sql =
      "INSERT INTO chat_messages (sender_id, receiver_id, message_text) VALUES (?, ?, ?)";
    const values = [sender_id, receiver_id, message_text];

    const [result] = await database.promise().query(sql, values);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message", details: error.message  });
  }
};

const getChat = async (req, res) => {
  try {
    const { sender_id, receiver_id } = req.query;

    const sql =
      "SELECT * FROM chat_messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY timestamp";
    const values = [sender_id, receiver_id, receiver_id, sender_id];

    const [messages] = await database.promise().query(sql, values);

    res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve messages", details: error.message });
  }
};

const deleteChat = async (req, res) => {
  try {
    const { sender_id, receiver_id } = req.query;

    const sql =
      "DELETE FROM chat_messages WHERE (sender_id = ? AND receiver_id = ?)";
    const values = [sender_id, receiver_id, receiver_id, sender_id];

    const [result] = await database.promise().query(sql, values);

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete chat", details: error.message  });
  }
};

router.post("/api/SendMessage", sendMessages);
router.get("/api/GetChatMessages", getChat);
router.delete("/api/DeleteChat", deleteChat);

module.exports = router;
