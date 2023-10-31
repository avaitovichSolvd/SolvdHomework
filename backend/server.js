const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const lawyerRoutes = require("./routes/lawyerRoutes");
const filterRoutes = require("./routes/filterRoutes");


app.use("/auth", authRoutes);
// http://localhost:3000/auth/api/SignUp POST new user
// http://localhost:3000/auth/api/SignIn POST login
// http://localhost:3000/auth/api/users GET list users

app.use("/user", userRoutes);
// http://localhost:3000/user/api/DeleteUser/:username DELETE user
// http://localhost:3000/user/api/AddToCart POST lawyer in cart
// http://localhost:3000/user/api/ViewCart/:username GET user's cart
// http://localhost:3000/user/api/RemoveFromCart DELETE lawyer card from user cart

app.use("/lawyer", lawyerRoutes);
// http://localhost:3000/lawyer/api/AddLawyer POST new 
// http://localhost:3000/lawyer/api/UpdateLawyer/:id_lawyer PUT new lawyer
// http://localhost:3000/lawyer/api/DeleteLawyer/:id_lawyer DELETE lawyer

app.use("/filter", filterRoutes);
// http://localhost:3000/filter/api/lawyers GET list lawyer with filter


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started ${port}`);
});
