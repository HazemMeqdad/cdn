const mongoose = require("mongoose");
const User = require("../models/user");
const File = require("../models/file");


module.exports.uploadController = (req, res) => {
    res.render("upload")
}

module.exports.uploadPostMiddleware = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let file = req.files.file;
    if (!file) {
        return res.status(400).send({"error": "no file uploaded"})
    }
    file.mv(`/opt/cdn/${file.name}`, function (err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
}
