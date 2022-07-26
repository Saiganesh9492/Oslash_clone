var mongoose = require("mongoose");


var shortcutsSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    user_id :{
        type : String,
        unique : false,
        required : true
    },

    short_link :{
        type : String,
        unique: [false, "name already exists"],
        required: [true, "Please enter shortcut Name"]

    },
    description :{
        type : String,
        unique: false,
        required :false

    },
    url :{
        type : String,
        unique : [false],
        required : [true,"Please enter URl"]
    },
    tags : {
        type : String,
        unique : false,
        required : false
    }

    
})


module.exports = mongoose.model("shortcuts",shortcutsSchema)