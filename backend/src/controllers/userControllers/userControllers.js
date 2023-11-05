const getUsers = require("./getUsers");
const deleteUser = require("./deleteUser");
const addFavorite = require("./addFavorite");
const getFavorites = require("./getFavorites");
const removeFavorite = require("./removeFavorite");

const userControllers = {
  getUsers: getUsers,
  deleteUser: deleteUser,
  addFavorite: addFavorite,
  getFavorites: getFavorites, 
  removeFavorite: removeFavorite,
};

module.exports = userControllers;
