const mongoose = require("mongoose");
const File = require("../models/file");

module.exports = (req, res, next) => {
    File.findOne({name: req.params.file})
        .populate("owner")
        .exec()
        .then(file => {
            if (!file) {
                return res.render("404");
            } else if (file.private) {
                return res.render("private");
            } else {
                req.file = file;
                next();
            }
        }).catch(err => {
            console.log(err);
            return res.render("private");
        })
}
