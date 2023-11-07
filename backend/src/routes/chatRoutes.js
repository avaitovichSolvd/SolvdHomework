const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const chatControllers = require("../controllers/chatControllers/chatControllers");

router.use(bodyparser.json());

router.post("/send_message", chatControllers.sendMessage); //body
router.get("/history", chatControllers.getChat); //query
router.delete("/history", chatControllers.deleteChat); //query

module.exports = router;
