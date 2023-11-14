const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const chatControllers = require("../controllers/chatControllers/chatControllers");
const { middlewareAuthentication } = require("../../jwt");

router.use(bodyparser.json());

router.post("/send_message", middlewareAuthentication, chatControllers.sendMessage); //body
router.get("/history", middlewareAuthentication, chatControllers.getChat); //query
router.delete("/history", middlewareAuthentication, chatControllers.deleteChat); //query

module.exports = router;
