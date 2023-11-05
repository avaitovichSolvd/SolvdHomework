const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const lawyerController = require("../controllers/lawyerController.js/lawyerController");

router.use(bodyparser.json());

router.post("/lawyer", lawyerController.addLawyer) //body
router.put("/lawyer/:id", lawyerController.updateLawyer) //params && body
router.delete("/lawyer/:id", lawyerController.deleteLawyer) //params

module.exports = router;
