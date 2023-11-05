const express = require("express");
const app = express();
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const lawyerRoutes = require("./src/routes/lawyerRoutes");
const filterRoutes = require("./src/routes/filterRoutes");
const calendarRoutes = require("./src/routes/calendarRoutes")
const chatRouters = require("./src/routes/chatRoutes")

app.use("/auth", authRoutes);
// http://localhost:3000/auth/api/SignUp POST new user
// http://localhost:3000/auth/api/SignIn POST login
// http://localhost:3000/auth/api/users GET list users

app.use("/user", userRoutes);
// http://localhost:3000/user/api/DeleteUser/:username DELETE user
// http://localhost:3000/user/api/AddToFavorites POST lawyer in cart
// http://localhost:3000/user/api/ViewFavorites/:username GET user's cart
// http://localhost:3000/user/api/RemoveFromFavorites DELETE lawyer card from user cart

app.use("/lawyers", lawyerRoutes);
// http://localhost:3000/lawyer/api/AddLawyer POST new
// http://localhost:3000/lawyer/api/UpdateLawyer/:id_lawyer PUT new lawyer
// http://localhost:3000/lawyer/api/DeleteLawyer/:id_lawyer DELETE lawyer

app.use("/filter", filterRoutes);
// http://localhost:3000/filter/api/lawyers GET list lawyer with filter

app.use("/calendar", calendarRoutes)
// http://localhost:3000/calendar/api/AddEvent POST create calendar event
// http://localhost:3000/calendar/api/GetEventList GET receive all events
// http://localhost:3000/calendar/api/DeleteEvent/:event_id DELETE event
// http://localhost:3000/calendar/api/EventNotificationToChat POST send event details in chat

app.use("/chat", chatRouters)
// http://localhost:3000/chat/api/SendMessage POST new message
// http://localhost:3000/chat/api/GetChatMessages GET chat history
// http://localhost:3000/chat/api/DeleteChat DELETE chat

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started ${port}`);
});
