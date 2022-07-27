const mongoose = require("mongoose");
// const { object } = require("webidl-conversions");

var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    //Validation for Email :
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Please enter Email Address"],
        validate: [
            {
                validator: function(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                Error: "Please enter a valid Email Address"
            }
            
        ]
       
    }
});

module.exports = mongoose.model("user",userSchema)