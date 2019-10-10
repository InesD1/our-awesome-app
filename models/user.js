const mongoose = require("mongoose");

const User = mongoose.model("user", {
    username: {type: String, required: [true, "Username"]},
    password: {type: String, required: [true, "Password"]},
    email: {
        type: String, 
        required: [true, "Email"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    firstname: String,
    lastname: String,
    wishlist: [{type: mongoose.Types.ObjectId, ref: "cleanedUpFoods"}], 
})

module.exports = User;