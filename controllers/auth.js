const express = require("express");
const axios = require("axios");
const User = require("../models/user");
const mongoose = require("mongoose");


module.exports.authController = (req, res) => {
    return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
}

module.exports.githubCallbackController = (req, response) => {

    // The req.query object has the query params that were sent to this route.
    const requestToken = req.query.code;
    const clientID = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        headers: {
            accept: 'application/json'
        }
    }).then((res) => {
        access_token = res.data.access_token;
        res = axios({
            method: "GET",
            url: "https://api.github.com/user",
            headers: {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/json',
            }
        }).then(res => {
            User.findOne({username: res.data.name})
                .exec()
                .then(result => {
                    if (result.length == 0) {
                        var user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: res.data.name,
                            access_token: access_token,
                            email: res.data.email,
                            allow: false
                        })
                        user.save()
                        .then((res) => {
                            response.redirect('/');
                        })
                        .catch(res => {
                            response.redirect("/404")
                        });
                        return;
                    } else {
                        User.updateOne({username: res.data.name}, {access_token: access_token}).exec();
                        response.cookie("token", access_token);
                        response.redirect("/");
                    }
                })
                .catch(err => {
                    response.redirect("/404")
                })
        }).catch(err => {
            response.redirect("/404")
        });
        
    })
  }
