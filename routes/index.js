const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
    return res.render("index", {client_id: process.env.GITHUB_CLIENT_ID});
})

route.get("/success", (req, res) => {
    return res.send("Success");
})


module.exports = route;

