const express = require("express");
const {uploadController} = require("../controllers/upload");

const authMiddleware = require("../middleware/auth");
const allowMiddleware = require("../middleware/allow");

const route = express.Router();

route.get("/upload", authMiddleware, allowMiddleware, uploadController)

module.exports = route;