const mongoose = require("mongoose");
const fs = require("fs");
const File = require("../models/file");

module.exports.filesController = (req, res) => {
    user_id = req.user._id;
    File.find({owner: user_id})
        // .populate("owner")
        .exec()
        .then(files => {
            fs.readdirSync(process.env.CDN_PATH+"/"+user_id).forEach(file => {
                console.log(file);
              });
            return res.render("files", {files: files, user: req.user})
        })
        .catch(err => {
            console.log(err);
            res.render("404")
        })
}


module.exports.filesViewController = (req, res) => {
    File.find({})
}

module.exports.publicFileController = (req, res) => {
    console.log(req.file)
    const path = process.env.CDN_PATH + "/" +req.file.owner._id + "/" + req.params.file;
    console.log(path)
    fs.readFile(path, {encoding: "utf-8"}, (err, file) => {
        if (err) {
            return res.render("404");
        }
        if (req.query.download == 'true') {
            return res.download(path);
        } else {
            console.log(req.file);
            res.send("Yoook")
        }
        
    })
}
