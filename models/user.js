const mongoose = require("mongoose");
// const { object } = require("webidl-conversions");

var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    //Validation for Email :
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Please enter Email Address"]
       
    }
});

module.exports = mongoose.model("user",userSchema)