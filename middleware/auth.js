const mongoose = require("mongoose");
const User = require("../models/user");
const axios = require("axios");

module.exports = (req, res, next) => {
    var access_token = req.cookies.token;
    if (!access_token) {
        return res.render("index");
    }
    axios({
        method: "GET",
        url: "https://api.github.com/user",
        headers: {
            Authorization: `Bearer ${access_token}`,
            accept: 'application/json',
        }
    }).then(res => {
        User.findOne({ username: res.data.name })
            .exec()
            .then(result => {
                if (!result) {
                    return res.render("index");
                } else {
                    req.user = res.data;
                    req.user.allow = result.allow;
                    req.user._id = result._id;
                    next();
                }
            })
            .catch(err => {
                return res.render("index");
            })
    })
}
