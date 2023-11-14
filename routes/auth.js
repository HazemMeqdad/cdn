const express = require("express");
const {authController, githubCallbackController} = require("../controllers/auth");

const route = express.Router();

route.get("/auth", authController)
route.get('/github/callback', githubCallbackController)

module.exports = route;