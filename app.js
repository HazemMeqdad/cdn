const express = require("express");
const mongoose = require("mongoose");

const authRout = require("./routes/auth");
const indexRout = require("./routes/index");
const uploadRoute = require("./routes/upload");
const filesRoute = require("./routes/files");

require("dotenv").config();  // setup configration

mongoose.connect(process.env.MONGOOSE_URI, {dbName: "cdn"})

const app = express();

app.use(express.static("views/public"))
app.use(authRout);
app.use(indexRout);

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