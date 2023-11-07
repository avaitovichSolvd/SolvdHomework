const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const calendarController = require("../controllers/calendarControllers.js/calendarController");

router.use(bodyParser.json());

router.post("/event", calendarController.addEvent);
router.get("/list", calendarController.getEvents);
router.delete("/event/:event_id", calendarController.deleteEvent);
router.post("/notification", calendarController.sendEvent);

module.exports = router;
