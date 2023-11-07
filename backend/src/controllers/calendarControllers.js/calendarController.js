const addEvent = require("./addEvent");
const deleteEvent = require("./deleteEvent");
const getEvents = require("./getEvents");
const sendEvent = require("./sendEvent");

const calendarController = {
    addEvent: addEvent,
    getEvents: getEvents,
    deleteEvent: deleteEvent,
    sendEvent: sendEvent,
};

module.exports = calendarController;