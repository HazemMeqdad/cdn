const express = require("express");
const authMiddleware = require("../middleware/auth")
const {indexController, logutController} = require("../controllers/index");

const route = express.Router();

route.get("/", indexController)

route.get("/logout", logutController)


module.exports = route;

