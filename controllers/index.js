const axios = require("axios");
const User = require("../models/user");

module.exports.indexController = (req, response) => {
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
}

module.exports.logutController = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
}
