const userModel = require("../../models/userModel");

const getFavorites = async (req, res) => {
  if (!req.params) {
    return res.status(400).json({ error: "Request params is missing" });
  }

  const { user_id } = req.params;

  if (!user_id) {
    return res
      .status(400)
      .json({ error: "id is required to view the favorites" });
  }

  try {

    const result = await userModel.getFavoritesList(user_id);

    if (result) {
      if (result.length > 0) {
        return res.status(200).json({ result: result });
      } else {
        return res.status(200).json({ message: "The favorites list is empty" });
      }
    } else {
      return res.status(404).json({ message: "This user doesn't exist" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error viewing favorites", details: error.message });
  }
};

module.exports = getFavorites;
