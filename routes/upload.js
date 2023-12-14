const express = require("express");
const {uploadController, uploadPostMiddleware} = require("../controllers/upload.js");

const authMiddleware = require("../middleware/auth");
const allowMiddleware = require("../middleware/allow");

const route = express.Router();

route.get("/", authMiddleware, allowMiddleware, uploadController)
route.post("/", authMiddleware, allowMiddleware, uploadPostMiddleware)

module.exports = route;