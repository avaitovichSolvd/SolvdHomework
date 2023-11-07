const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers/userControllers");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.get("/users", userController.getUsers); //null
router.delete("/users/:user_id", userController.deleteUser); //params
router.post("/favorite", userController.addFavorite); //body
router.get("/favorites/:user_id", userController.getFavorites); //params
router.delete("/favorite", userController.removeFavorite); //query

module.exports = router;