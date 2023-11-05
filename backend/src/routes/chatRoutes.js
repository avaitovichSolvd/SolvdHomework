const express = require("express");
const router = express.Router();
const database = require("../../db/DBkey");
const bodyparser = require("body-parser");

router.use(bodyparser.json());

const sendMessages = async (req, res) => {
  try {
    const { user_chat, lawyer_chat, message_text, sender_type } = req.body;

    const sql =
      "INSERT INTO chat_messages (user_chat, lawyer_chat, message_text, sender_type) VALUES (?, ?, ?, ?)";
    const values = [user_chat, lawyer_chat, message_text, sender_type];

    const [result] = await database.promise().query(sql, values);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message", details: error.message  });
  }
};

const getChat = async (req, res) => {
  try {
    const { user_chat, lawyer_chat } = req.query;

    const sql =
      "SELECT * FROM chat_messages WHERE (user_chat = ? AND lawyer_chat = ?) OR (user_chat = ? AND lawyer_chat = ?) ORDER BY timestamp";
    const values = [user_chat, lawyer_chat, lawyer_chat, user_chat];

    const [messages] = await database.promise().query(sql, values);

    res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve messages", details: error.message });
  }
};

const deleteChat = async (req, res) => {
  try {
    const { user_chat, lawyer_chat } = req.query;

    const sql =
      "DELETE FROM chat_messages WHERE (user_chat = ? AND lawyer_chat = ?)";
    const values = [user_chat, lawyer_chat, lawyer_chat, user_chat];

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
