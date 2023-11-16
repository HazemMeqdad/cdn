const express = require("express");
const authMiddleware = require("../middleware/auth");
const allowMiddleware = require("../middleware/allow");
const publicMiddleware = require("../middleware/public");
const {filesController, filesViewController, publicFileController, publicController, filesDeleteController, downloadFileController} = require("../controllers/files");

const route = express.Router();

route.get("/files", authMiddleware, allowMiddleware, filesController)
route.get("/files/:file", authMiddleware, allowMiddleware, filesViewController)

route.get("/f/:file", publicMiddleware, publicFileController);
route.get("/d/:file", authMiddleware, allowMiddleware, downloadFileController);

route.patch("/files/:file/public", authMiddleware, allowMiddleware, publicController)
route.delete("/files/:file", authMiddleware, allowMiddleware, filesDeleteController)

module.exports = route;