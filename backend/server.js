require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const lawyerRoutes = require("./src/routes/lawyerRoutes");
const calendarRoutes = require("./src/routes/calendarRoutes");
const chatRouters = require("./src/routes/chatRoutes");

app.use(cors());

app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.use("/lawyers", lawyerRoutes);

app.use("/calendar", calendarRoutes);

app.use("/chat", chatRouters);


/* global process */

const startServer = async (port) => {
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(`Server started ${port}`);
      resolve(server);
    });
  });
};
process.env.NODE_ENV === 'test' ? 0 : startServer(3000) 

module.exports = { app, startServer };
