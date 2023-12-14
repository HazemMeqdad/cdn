const mongoose = require("mongoose");
const User = require("../models/user");


module.exports = (req, res, next) => {
    if (!req.user.allow) {
        return res.render("no-permissions");
    }
    next()
}

