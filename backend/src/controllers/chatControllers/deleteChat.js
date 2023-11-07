const chatModel = require("../../models/chatModel");

const deleteChat = async (req, res) => {
  try {
    const { user_id, lawyer_id } = req.query;

    const result = await chatModel.deleteChat(user_id, lawyer_id);
    
    if(result){
      return res.status(200).json({ message: "Chat deleted successfully" });
    }else{
      return res.status(404).json({ error: "User or lawyer not found" })
    }
    
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete chat", details: error.message });
  }
};

module.exports = deleteChat;
