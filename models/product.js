var mongoose = require("mongoose")

const Product = mongoose.model("product", {
    title: String,
    description: String,
})

module.exports = Product