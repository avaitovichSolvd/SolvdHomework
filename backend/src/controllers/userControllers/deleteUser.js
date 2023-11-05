const userModel = require("../../models/userModel");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "User id must be provided" });
    }

    const result = await userModel.deleteUser(id);

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