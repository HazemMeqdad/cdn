const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("../middleware/auth");

const route = express.Router();

route.get("/files", authMiddleware, (req, res) => {

})

route.get("/files/:path", authMiddleware, (res, req) => {
    
})

module.exports = route;