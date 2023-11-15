const database = require("./db/DBkey");
const fs = require('fs');
const path = require('path');

const clearTestData = async () => {
    try {
        // await database.promise().query("CREATE DATABASE IF NOT EXISTS testDB");
        // await database.promise().beginTransaction();

        // eslint-disable-next-line
        const scriptPath = path.join(__dirname, '..', 'backend/__tests__', 'testDB.sql');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');
        await database.promise().query(scriptContent);

        await database.promise().query("DELETE FROM chat_messages");
        await database.promise().query("DELETE FROM calendar_events");
        await database.promise().query("DELETE FROM favorites");
        await database.promise().query("DELETE FROM lawyer");
        await database.promise().query("DELETE FROM user");

        await database.promise().commit();
    } catch (error) {
        await database.promise().rollback();
        console.error("Error clearing test data:", error);
        throw error;
    }
};

module.exports = clearTestData;

