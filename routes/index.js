const express = require("express");
const axios = require("axios");
const User = require("../models/user");
const authMiddleware = require("../middleware/auth")

const route = express.Router();

const fetchUser = (req) => {
    var access_token = req.cookies.token;
    if (!access_token) {
        return 0;
    }
    axios({
        method: "GET",
        url: "https://api.github.com/user",
        headers: {
            Authorization: `Bearer ${access_token}`,
            accept: 'application/json',
        }
    }).then(res => {
        console.log(res.data)
        User.findOne({ username: res.data.name })
            .exec()
            .then(result => {
                if (!result) {
                    return 0;
                } else {
                    req.user = result;
                    return result;
                }
            })
            .catch(err => {
                return 0;
            })
    })
}

route.get("/", (req, res) => {
    var user = fetchUser(req);
    if (user) {
        return res.render("index", {isLogging: true, user: user});
    }
    return res.render("index", {isLogging: false});
})

route.get("/upload", authMiddleware, (req, res) => {
    return res.render("upload");
})

route.get("/success", (req, res) => {
    return res.send("Success");
})


module.exports = route;

