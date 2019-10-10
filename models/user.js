const mongoose = require("mongoose");
const Schema = mongoose.Schema

const User = mongoose.model("user", {
  username: {type: String, required: [true, "Please, provide a valid username"]},
  password: {type: String, required: [true, "Please, provide a valid password"]},
  email: {
      type: String, 
      required: [true, "Please, provide a valid email address"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  wishlist: [{type: mongoose.Types.ObjectId, ref: "cleanedUpFoods"}], 
})

module.exports = User;