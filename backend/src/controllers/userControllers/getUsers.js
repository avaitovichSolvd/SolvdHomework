const userModel = require("../../models/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUserList();
    return res.status(200).json({ users });
  } catch (error){
    return res.status(500).json({ error: "Failed to fetch users" })
  }
};

module.exports = getUsers