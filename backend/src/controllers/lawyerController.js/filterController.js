const filterModel = require("../../models/lawyerModel");

const filterController = async (req, res) => {
  try {
    const queryParams = req.query;
    const result = await filterModel.getList(queryParams);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

module.exports = filterController;
