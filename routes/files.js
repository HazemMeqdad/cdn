const express = require("express");
const authMiddleware = require("../middleware/auth");
const allowMiddleware = require("../middleware/allow");
const {filesController, filesPathController} = require("../controllers/files");

const route = express.Router();

route.get("/files", authMiddleware, allowMiddleware, filesController)
route.get("/files/:path", authMiddleware, allowMiddleware, filesPathController)

module.exports = route;