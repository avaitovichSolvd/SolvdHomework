const addLawyer = require("./addLawyer");
const deleteLawyer = require("./deleteLawyer");
const filterController = require("./filterController");
const updateLawyer = require("./updateLawyer");

const lawyerController = {
  addLawyer: addLawyer,
  updateLawyer: updateLawyer,
  deleteLawyer: deleteLawyer,
  getList: filterController,
};

module.exports = lawyerController;