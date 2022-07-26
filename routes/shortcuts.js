var express = require("express");
var router = express.Router();
var mongoose = require("mongoose")

var jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

var User = require("../models/user");
var Shortcut = require("../models/shortcut")

var config = require("../config/default.json");
var constants_function = require("../constants/constants");
var constants = constants_function("user");
var user_email_verfication = require("../middleware/emails/user-email_verification");
const checkAuth = require("../middleware/check-auth");

router.post("/",checkAuth,async(req,res)=>{

    try {
        const {short_link,description,url,tags} = req.body;

    const email = req.user.email;

    const user = await User.findOne({email : email})
    
    console.log("26 shorts cuts user", user.id)

    const new_shortcut =  new Shortcut({
        _id : new mongoose.Types.ObjectId(),
        user_id : user._id,
        short_link : short_link,
        description : description,
        url : url,
        tags : tags
    })

    await new_shortcut.save()
    res.send({
        "data" : new_shortcut
    })

    }catch(err){
        res.status(401).json({
            "status": {
                "success": false,
                "code": 401,
                "message": constants.NOT_AUTHORIZED
            }
        });
        console.log(err);
    } 
});

router.get("/user",checkAuth, async(req, res)=>{
    
    try{

        //Finding candidate by ID :
        const user = req.user;
        const new_user = await User.findOne({email : user.email})
        console.log("  61 shortcuts new user ID",new_user.id)
        const shortcut_data = await Shortcut.find({user_id : new_user.id} )

            res.status(200).json({
                "status": {
                    "success": true,
                    "code": 200,
                    "message": constants.SUCCESSFUL
                },
                "data": shortcut_data
            });
        // }

    //Error Catching :
    }catch(err){
        res.status(400).json({
            "status": {
                "success": false,
                "code": 400,
                "message": err.message
            }
        });
        console.log("97",err.message);
    }
});




module.exports=router;