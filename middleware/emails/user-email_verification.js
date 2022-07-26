//Dependencies Imported :
var config = require("../../config/default.json");
var nodemailer = require("nodemailer");
var jwt = require("jsonwebtoken");




//Importing Constants :
var constants_function = require("../../constants/constants");
var constants = constants_function();



//Node-Mailer for Sending Emails :
module.exports = function ( email ,url){

    //Configuration of Node-Mailer :
    let transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : config.userI,
            pass : config.passI
        }
    });

    //Token Generation :
    const token = jwt.sign(
        {
            email: email
        },
        config.USER_VERIFICATION_PASSWORD_JWT_KEY
    );

    //Verification URL :
    const link = url+token;
    
    //Email Details :
    let mailOptions = {
        from :"edgeview0@gmail.com",
        to : email,
        subject : "Email Verification",
        text : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to sign in Oslash.<br><a href="+link+">Click here to verify and sign in Oslash directly</a>"
    };

    //Email Sending :
    transporter.sendMail(mailOptions,function(err,data){
        if (err){
            console.log({
                "status": {
                    "success": false,
                    "code": 400,
                    "message": constants.EMAIL_NOT_SENT
                }
            });
            console.log(err);
        }
        else
        {
            console.log ({
                "status": {
                    "success": true,
                    "code": 200,
                    "message": constants.EMAIL_SENT
                }
            });
        }
    });
};