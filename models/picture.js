const mongoose = require("mongoose");

const Picture = mongoose.model("Picture", {
    path: String,
})

module.exports = Picture;