const { check } = require("express-validator");


var Shorcut =  require("../../models/shortcut")

module.exports = function shortcut_validator() {
    return [
        check("email")
        .notEmpty().withMessage("Please enter Email Address").bail()
        .isEmail().withMessage("Enter valid Email Address").bail()
        
    ]
    
}
