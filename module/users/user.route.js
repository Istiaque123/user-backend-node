const express = require("express");
const userController = require("./user.controller");

const routes = express.Router();

routes.post('/create', userController.createUsers);

routes.get("/getAll", userController.getAll);

routes.get("/getById/:id", userController.getById);


module.exports = routes;