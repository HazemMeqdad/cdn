const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();  // setup configration

if (!process.env.MONGOOSE_URI || process.env.MONGOOSE_URI !== "") {
    mongoose.connect(process.env.MONGOOSE_URI)
} else {
    console.error("No mongodb uri configration: `MONGOOSE_URI` is missing")
    exit();
}
const app = express();

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