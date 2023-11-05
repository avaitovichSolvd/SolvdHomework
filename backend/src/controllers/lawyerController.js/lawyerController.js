const addLawyer = require("./addLawyer");
const deleteLawyer = require("./deleteLawyer");
const updateLawyer = require("./updateLawyer");

const lawyerController = {
  addLawyer: addLawyer,
  updateLawyer: updateLawyer,
  deleteLawyer: deleteLawyer,
};

module.exports = lawyerController;
