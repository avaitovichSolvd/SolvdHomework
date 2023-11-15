const database = require("./db/DBkey");

const clearTestData = async () => {
    await database.promise().query("DELETE FROM chat_messages");
    await database.promise().query("DELETE FROM calendar_events");
    await database.promise().query("DELETE FROM favorites");
    await database.promise().query("DELETE FROM lawyer");
    await database.promise().query("DELETE FROM user");
 };

module.exports = clearTestData;
