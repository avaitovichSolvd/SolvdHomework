const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const calendarController = require("../controllers/calendarControllers.js/calendarController");
const { middlewareAuthentication } = require("../../jwt");

router.use(bodyParser.json());

router.post("/event", middlewareAuthentication, calendarController.addEvent);
router.get("/list", middlewareAuthentication, calendarController.getEvents);
router.delete("/event/:event_id", middlewareAuthentication, calendarController.deleteEvent);
router.post("/notification", middlewareAuthentication, calendarController.sendEvent);

module.exports = router;
