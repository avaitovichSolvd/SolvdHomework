const lawyerModel = require("../../models/lawyerModel");

const updateLawyer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      phone_number,
      email,
      branch_of_law,
      description,
      rate,
      budget,
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: "All fields must be filled in" });
    }

    const result = await lawyerModel.updateLawyer(
      id,
      first_name,
      last_name,
      phone_number,
      email,
      branch_of_law,
      description,
      rate,
      budget
    );

    if (result) {
      return res.status(200).json({ message: "Lawyer profile updated" });
    } else {
      return res.status(404).json({ error: "Lawyer not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Operation has failed", details: error.message });
  }
};

module.exports = updateLawyer;
