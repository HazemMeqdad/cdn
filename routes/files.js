const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("../middleware/auth");
const allowMiddleware = require("../middleware/allow");

const route = express.Router();

route.get("/files", authMiddleware, allowMiddleware, (req, res) => {
    res.render("files")
})

route.get("/files/:path", authMiddleware, allowMiddleware, (res, req) => {

})

module.exports = route;