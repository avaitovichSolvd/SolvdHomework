const calendarModel = require("../../models/calendarModel");

const addEvent = async (req, res) => {
  try {
    const { lawyer_id, user_id, event_date, event_description } = req.body;

    if (!lawyer_id || !user_id || !event_date) {
      return res.status(400).json({ error: "All fields must be filled in" });
    }

    const result = await calendarModel.addEvent(
      lawyer_id,
      user_id,
      event_date,
      event_description
    );
    res.status(201).json({ message: "Event created successfully", result: result });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create event", details: error.message });
  }
};

module.exports = addEvent;
