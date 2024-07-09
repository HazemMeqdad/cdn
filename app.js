const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const fs = require("fs");
const fileUpload = require('express-fileupload');
var morgan = require('morgan')

const authRout = require("./routes/auth");
const indexRout = require("./routes/index");
const uploadRout = require("./routes/upload");
const filesRout = require("./routes/files");

require("dotenv").config();  // setup configration

if (!process.env.CDN_PATH) {
    console.log("Please set `CDN_PATH` in env")
    process.exit()
}
if (!fs.existsSync(process.env.CDN_PATH)) {
    // sudo mkdir /opt/cdn
    // sudo chown -R $USER:$USER /opt/cdn
    console.log("Look in app.js file line 18 and 19.")
    process.exit()
}
 

mongoose.connect(process.env.MONGOOSE_URI, {dbName: "cdn"})

const app = express();

app.use(morgan("tiny"));
app.use(fileUpload());
app.use(express.static("views/public"))
app.use(cookieParser())
app.use(authRout);
app.use(indexRout);
app.use(filesRout);
app.use("/upload", uploadRout);

app.set("view engine", "ejs");
const application = {
    port:  process.env.PORT || 5000,
    host: process.env.HOST || "0.0.0.0"
}

app.listen(
    application.port, 
    application.host,
    () => {
        console.log(`server is running on http://${application.host}:${application.port}`);
    }
)
