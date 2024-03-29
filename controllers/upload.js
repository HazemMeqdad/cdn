const mongoose = require("mongoose");
const fs = require("fs");
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
    extension = file.name.match(/[0-9a-z]+$/i)[0];
    const now = new Date();
    const milliseconds = now.getTime();

    const date = new Date(milliseconds);

    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    // YYYY-MM-DD
    const formatted = `${day}/${month}/${year}`;
    fileObj = new File({
        _id: new mongoose.Types.ObjectId(),
        path: `/${file.name}`,
        extension: extension,
        name: file.name,
        owner: req.user._id,
        ownerName: req.user.name,
        private: true,
        uploadAt: formatted
    })
    fileObj.save();
    if (!fs.existsSync(`/opt/cdn/${req.user._id}`)) {
        fs.mkdirSync(`/opt/cdn/${req.user._id}`);
    }
    file.mv(`/opt/cdn/${req.user._id}/${file.name}`, function (err) {
        if (err)
            return res.status(500).send(err);
        return res.send('File uploaded!');
    });
}
