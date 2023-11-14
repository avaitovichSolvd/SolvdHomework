const lawyerModel = require("../../models/lawyerModel");

const deleteLawyer = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Lawyer ID must be provided" });
  }
  try {
    const result = lawyerModel.deleteLawyer(id);

    if (result) {
      return res.status(200).json({ message: "Lawyer deleted successfully" });
    } else {
      return res.status(404).json({ error: "Lawyer not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Operation has failed", details: error.message });
  }
};

module.exports = deleteLawyer;
