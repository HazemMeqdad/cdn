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
              });
            return res.render("files", {files: files, user: req.user})
        })
        .catch(err => {
            res.render("404")
        })
}


module.exports.filesViewController = (req, res) => {
    // const path = process.env.CDN_PATH + "/" +req.user._id + "/" + req.params.file;
    File.findOne({name: req.params.file})
        .exec()
        .then(result => {
            if (!result) {
                return res.render("404");
            } else {
                return res.render("file", {file: result});
            }
        })
        .catch(err => {
            return res.render("404");
        })
}

module.exports.publicFileController = (req, res) => {
    const path = process.env.CDN_PATH + "/" +req.file.owner._id + "/" + req.params.file;
    fs.readFile(path, {encoding: "utf-8"}, (err, file) => {
        if (err) {
            return res.render("404");
        }
        if (req.query.download == 'true') {
            return res.download(path);
        } else {
            return res.sendFile(path);
        }
        
    })
}

module.exports.publicController = (req, res) => {
    const file = req.params.file;
    File.findOne({name: file})
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({message: "Error"})
            } else {
                File.updateOne({name: file}, {private: !result.private}).exec();
                return res.status(200).json({message: "Update successfully"})
            }

        })
        .catch(err => {
            return res.status(404).json({message: "Error"})
        })
}


module.exports.filesDeleteController = (req, res) => {
    const file = req.params.file;
    const path = process.env.CDN_PATH + "/" +req.user._id + "/" + req.params.file;
    File.findOne({name: file})
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({message: "Error"})
            } else {
                File.deleteOne({name: file}).exec();
                fs.unlinkSync(path);
                return res.status(200).json({message: "Delete successfully"})
            }

        })
        .catch(err => {
            return res.status(404).json({message: "Error"})
        })
}


module.exports.downloadFileController = (req, res) => {
    const path = process.env.CDN_PATH + "/" +req.user._id + "/" + req.params.file;
    fs.readFile(path, {encoding: "utf-8"}, (err, file) => {
        if (err) {
            return res.render("404");
        }
        res.sendFile(path);
        // res.end();    
    })
}
