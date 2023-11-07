require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const lawyerRoutes = require("./src/routes/lawyerRoutes");
const calendarRoutes = require("./src/routes/calendarRoutes");
const chatRouters = require("./src/routes/chatRoutes");

app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.use("/lawyers", lawyerRoutes);

app.use("/calendar", calendarRoutes);

app.use("/chat", chatRouters);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started ${port}`);
});
