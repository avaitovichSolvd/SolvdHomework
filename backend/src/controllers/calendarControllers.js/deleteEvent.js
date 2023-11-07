const calendarModel = require("../../models/calendarModel");

const deleteEvent = async (req, res) => {
  try {
    const { event_id } = req.params;

    const result = await calendarModel.deleteEvent(event_id);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Event not found" });
    } else {
      res.status(200).json({ message: "Event deleted successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete event", details: error.message });
  }
};

module.exports = deleteEvent;
