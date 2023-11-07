const calendarModel = require("../../models/calendarModel");

const getEvents = async (req, res) => {
  try {
    const { lawyer_id, user_id } = req.query;
    const result = await calendarModel.getEvents(lawyer_id, user_id);

    if (result) {
      if (result.length !== 0) {
        return res.status(200).json({ result });
      } else {
        return res
          .status(200)
          .json({ error: "No events found", result: result });
      }
    } else {
      return res.status(404).json({ error: "This event doesn't exist" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve events", details: error.message });
  }
};

module.exports = getEvents;
