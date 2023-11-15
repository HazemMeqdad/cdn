const express = require("express");
const authMiddleware = require("../middleware/auth");
const allowMiddleware = require("../middleware/allow");
const publicMiddleware = require("../middleware/public");
const {filesController, filesViewController, publicFileController, publicController} = require("../controllers/files");

const route = express.Router();

route.get("/files", authMiddleware, allowMiddleware, filesController)
route.get("/files/:filename", authMiddleware, allowMiddleware, filesViewController)
route.get("/f/:file", publicMiddleware, publicFileController);
route.patch("/files/:file/public", authMiddleware, allowMiddleware, publicController)

module.exports = route;