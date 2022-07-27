const { check } = require("express-validator");


var Shorcut =  require("../../models/shortcut")

module.exports = function shortcut_validator() {
    return [
        check("short_link")
        .notEmpty().withMessage("Please enter short_link").bail(),

        check("description")
        .optional()
        .isString().withMessage("Description must be string"),

        check("url")
        .notEmpty().withMessage("Please enter URL").bail()
        .isURL().withMessage("Invalid URL").bail()

        
    ]
    
}
