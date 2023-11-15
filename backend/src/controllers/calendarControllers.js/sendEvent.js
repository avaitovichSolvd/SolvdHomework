const calendarModel = require("../../models/calendarModel");
const chatModel = require("../../models/chatModel");

const sendEvent = async (req, res) => {
  try {
    const { user_id, lawyer_id, event_id, sender_type } = req.body;

    const event = await calendarModel.findEvent(event_id);

    if (event.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    const eventObject = {
      event_date: event[0].event_date,
      event_description: event[0].event_description,
      lawyer_id: event[0].lawyer_id,
      user_id: event[0].user_id,
    };
    const message_text = JSON.stringify(eventObject);

    const result = await chatModel.sendMessage(
      user_id,
      lawyer_id,
      message_text,
      sender_type
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "User or lawyer not found" });
    } else {
      res
        .status(200)
        .json({ message: "Event details sent to chat successfully" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to send event details to chat",
      details: error.message,
    });
  }
};

module.exports = sendEvent;
