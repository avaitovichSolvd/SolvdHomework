const lawyerModel = require("../../models/lawyerModel");

const addLawyer = async (req, res) => {
  try {
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

    if (
      !first_name ||
      !last_name ||
      !email ||
      !branch_of_law ||
      !rate ||
      !budget
    ) {
      return res.status(400).json({ error: "All fields must be filled in" });
    }

    const result = await lawyerModel.addLawyer(
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
      console.log(result)
      return res
        .status(201)
        .json({ message: "Operation to add a new lawyer was successful", result});
    } else {
      return res
        .status(500)
        .json({ error: "Operation to add a new lawyer failed" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Operation has failed", details: error.message });
  }
};

module.exports = addLawyer;
