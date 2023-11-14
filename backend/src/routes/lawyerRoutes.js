const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const lawyerController = require("../controllers/lawyerController.js/lawyerController");
const { middlewareAuthentication } = require("../../jwt");

router.use(bodyparser.json());

router.post("/lawyer", middlewareAuthentication, lawyerController.addLawyer) //body
router.put("/lawyer/:id", middlewareAuthentication, lawyerController.updateLawyer) //params && body
router.delete("/lawyer/:id", middlewareAuthentication, lawyerController.deleteLawyer) //params
router.get("/filter", lawyerController.getList) //query

module.exports = router;
