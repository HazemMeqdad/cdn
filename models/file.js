const mongoose = require("mongoose");

const File = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    path: {type: String, required: true},
    name: {type: String, required: true},
    extension: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    ownerName: {type: String, required: true},
    private: {type: Boolean, required: true}
});


module.exports = mongoose.model("File", File);
