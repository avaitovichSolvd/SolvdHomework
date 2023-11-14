const chatModel = require("../../models/chatModel");

const sendMessage = async (req, res) => {
  try {
    const { user_id, lawyer_id, message_text, sender_type } = req.body;

    if (!user_id || !lawyer_id || !message_text || !sender_type) {
      return res.status(400).json({ error: "All fields must be filled in" });
    }

    const result = await chatModel.sendMessage(
      user_id,
      lawyer_id,
      message_text,
      sender_type
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User or lawyer not found" });
    } else {
      return res.status(201).json({ message: "Message sent successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send message", details: error.message });
  }
};

module.exports = sendMessage;
