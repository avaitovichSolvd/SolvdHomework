const userModel = require("../../models/userModel");

const removeFavorite = async (req, res) => {
  try {
    const { user_id, lawyer_id } = req.query;

    if (!user_id || !lawyer_id) {
      return res
        .status(400)
        .json({ error: "Both user_id and lawyer_id are required" });
    }

    const result = await userModel.removeFavorite(user_id, lawyer_id);

    if (result) {
      return res.status(200).json({ message: "Lawyer deleted successfully from list" });
    } else {
      return res.status(404).json({ error: "User of lawyer not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Operation has failed" });
  }
};

module.exports = removeFavorite;
