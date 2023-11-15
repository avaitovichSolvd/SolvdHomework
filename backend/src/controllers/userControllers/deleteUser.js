const userModel = require("../../models/userModel");

const deleteUser = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ error: "User id must be provided" });
  }
  try {

    const result = await userModel.deleteUser(user_id);

    if (result) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Operation has failed", details: error.message });
  }
};

module.exports = deleteUser