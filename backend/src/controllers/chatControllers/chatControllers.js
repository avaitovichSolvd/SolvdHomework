const deleteChat = require("./deleteChat");
const getChat = require("./getChat");
const sendMessage = require("./sendMessage");

const chatControllers = {
  sendMessage: sendMessage,
  getChat: getChat,
  deleteChat: deleteChat,
};

module.exports = chatControllers;
