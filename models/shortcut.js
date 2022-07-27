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
        required : [true,"Please enter URl"],
        // validate :[
        //     {
        //     validator: function(v) {
        //         var regexQuery = "/(http(s)?://.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/";
        //         var url = new RegExp(regexQuery,"g");
        //          return url.test(v);
        //          },
        //       Error: "Please enter valid URL"
        //     }
        // ]
    },
    tags : {
        type : String,
        unique : false,
        required : false
    }

    
})


module.exports = mongoose.model("shortcuts",shortcutsSchema)