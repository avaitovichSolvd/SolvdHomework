const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers/authController");

const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.post("/register", authController.register); //body
router.post("/login", authController.login);

module.exports = router;