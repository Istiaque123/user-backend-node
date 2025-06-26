const express = require("express");
const authController = require("./auth.controller");


const route = express.Router();

route.post("/register", authController.register);
route.post("/login", authController.login);
route.post("/refresh", authController.refreashToken);

module.exports = route;