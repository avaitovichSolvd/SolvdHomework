const userModel = require("../../models/userModel");

const addFavorite = async (req, res) => {
  const { user_id, lawyer_id } = req.body;

  if (!user_id || !lawyer_id) {
    return res
      .status(400)
      .json({ error: "user_id and lawyer_id are required" });
  }

  try {
    const results = await userModel.addToFavorite(user_id, lawyer_id);

    if (results) {
      return res
        .status(200)
        .json({ message: "Lawyer profile added to the favorites" });
    } else {
      return res.status(500).json({ error: "Error adding to favorites" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error adding to cart", details: error.message });
  }
};

module.exports = addFavorite