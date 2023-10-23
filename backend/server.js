const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);
// http://localhost:3000/auth/api/SignUp POST new user
// http://localhost:3000/auth/api/SignIn POST login
// http://localhost:3000/auth/api/users GET list users

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started ${port}`);
});
