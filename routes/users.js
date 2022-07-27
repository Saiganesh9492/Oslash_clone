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
var User_validator = require("../middleware/validations/User_validator")


router.post("/signin",User_validator(), async(req, res, next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        //Respose for Validation Error :
        console.log(errors.array());
        return res.status(422).json({
            "status": {
                "success": false,
                "code": 422,
                "message": errors.array()[0].msg
            }
        });
    }

    try {

        //Finding User by Email :
        const email = req.body.email;
        const user = await  User.find({email :email});

        //Returning Error if User Not Found
        if (user.length >= 1) {
            return res.status(401).json({
                "status": {
                    "success": false,
                    "code": 401,
                    "message": constants.AUTHORIZATION_FAILED
                }
            });
        }
        else
        {
              const url = req.protocol + "://" + req.get("host") + "/users/verify/"; 
               user_email_verfication(email,url);
                res.status(250).json({
                    "status" : {
                        "success" : true,
                        "code" : 250,
                        "message" : "Email sent successfully"
                    }
                 })
                 }

        //Error Catching :
    } catch (err) {
        res.status(400).json({
            "status": {
                "success": false,
                "code": 400,
                "message": err.message
            }
        });
        console.log(err);
    }
});

router.get("/verify/:token_id",async(req,res)=>{
    try{
        const token = req.params.token_id;
        const decoded = await jwt.decode(token, config.USER_VERIFICATION_PASSWORD_JWT_KEY);
        if(!decoded)
        {
            res.status(401).json({
                "status": {
                    "success": false,
                    "code": 401,
                    "message": constants.NOT_AUTHORIZED
                }
            });
            console.log(err);
        }

        const email = decoded.email;
        const user = await  User.find({email : email});

        //Returning Error if User Not Found
        const access_token = jwt.sign(
            {
                email: email 
            },
            config.ADMIN_JWT_KEY
        );

        if (user.length >= 1) {
            res.send({
                "token" : access_token
            })
        }
        else{
            const new_user = new User({
                _id: new mongoose.Types.ObjectId(),
                "email" : email
            })
         await new_user.save()

         res.send({
            "token" : access_token
         })
        }





    }catch (err) {
        res.status(401).json({
            "status": {
                "success": false,
                "code": 401,
                "message": constants.NOT_AUTHORIZED
            }
        });
        console.log(err);
    }
    


})


router.get('/signout', async(req, res)=> {

    try {
        // remove the req.user property and clear the login session
        res.status(200).json({
            "status": {
                "success" : true,
                "code" : 200,
                "message" : "redirect home page by destroying jwt"
            }
        })
        
    } catch (err) {
        res.status(400).json({
            "status": {
                "success": false,
                "code": 400,
                "message": err.message
            },
        });
        console.log(err)
        
    }

    

       
  });






module.exports=router;