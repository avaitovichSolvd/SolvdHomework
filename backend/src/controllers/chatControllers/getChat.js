const chatModel = require("../../models/chatModel");

const getChat = async (req, res) => {
  try {
    const { user_id, lawyer_id } = req.query;

    if (!user_id || !lawyer_id) {
      return res.status(400).json({ error: "All fields must be filled in" });
    }

    const result = await chatModel.getChat(user_id, lawyer_id);
    if (result) {
      return res.status(200).json({ result });
    } else {
      return res.status(404).json({ error: "User or lawyer not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve messages", details: error.message });
  }
};

module.exports = getChat;
