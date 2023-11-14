const express = require("express");
const axios = require("axios");
const User = require("../models/user");
const authMiddleware = require("../middleware/auth")

const route = express.Router();

route.get("/", (req, response) => {
    var access_token = req.cookies.token;
    if (!access_token) {
        return response.render("index", {isLogging: false});
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
                console.log(result ? true : false)
                if (result) {
                    return response.render("index", {isLogging: true, user: res.data});
                } else {
                    return response.render("index", {isLogging: false});
                }
            })
            .catch(err => {
                return response.render("index", {isLogging: false});
            })
    })
})

route.get("/upload", authMiddleware, (req, res) => {
    return res.render("upload");
})

route.get("/success", (req, res) => {
    return res.send("Success");
})


module.exports = route;

