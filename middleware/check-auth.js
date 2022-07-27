const jwt = require("jsonwebtoken");
var config = require("../config/default.json");



//Importing Constants :
var constants_function = require("../constants/constants");
var constants = constants_function();
var User = require("../models/user")



//Function to check authentication for Admin :
module.exports = async(req, res,next)=>{
    try {

        //Verifying the Token :
        // console.log("check auth 18",req.headers.authorization)
        const token = await req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, config.ADMIN_JWT_KEY);

        const user = await User.findOne({email : decoded.email})
        req.user = {
            email : decoded.email,
            user_id : user.id
        }
        res.locals.user = req.user;  
        res.locals.authenticated = !req.user.anonymous;

        next()

    //Error Catching :
    } catch (err) {
        res.status(401).json({
            "status": {
                "success": false,
                "code": 401,
                "message": constants.NOT_AUTHORIZED
            }
        });
        console.log(err);
    }
};