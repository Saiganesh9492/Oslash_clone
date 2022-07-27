var express = require("express");
var router = express.Router();
var mongoose = require("mongoose")

var jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
var SF_Pag = require("../middleware/Search_functionality-pagination");
var Shortcut_validator = require("../middleware/validations/shortcut_validator")

var User = require("../models/user");
var Shortcut = require("../models/shortcut")

var config = require("../config/default.json");
var constants_function = require("../constants/constants");
var constants = constants_function("shortcut");
var user_email_verfication = require("../middleware/emails/user-email_verification");
const checkAuth = require("../middleware/check-auth");

router.post("/",Shortcut_validator(),checkAuth,async(req,res)=>{

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
        
        const {short_link,description,url,tags} = req.body;

    const email = req.user.email;

    const user = await User.findOne({email : email})
    console.log("26 shorts cuts user", user.id)

    var arr = Shortcut.find({user_id : user.id})
    var sl_array = (await arr).map(x=>x.short_link)
    var tagsCreated = [];

    if(tags)
    {
        for(let i=0;i<tags.length;i++)
    {
        if(sl_array.includes(tags[i]))
        {
            return res.status(400).json({
                "status" : {
                    "success" : false,
                    "code" : 400,
                    "message" : "cannot create tag as already shortlink exist with it name"
    
                }
            })

        }
        else{
            const new_shortcut =  new Shortcut({
                _id : new mongoose.Types.ObjectId(),
                user_id : user._id,
                short_link : short_link,
                description : description,
                url : url,
                tags : tags[i]
            })
        
            await new_shortcut.save()
            tagsCreated.push(tags[i])

        }
    }
    res.status(201).json({
        "status":{
            "success" : true,
            "code" : 201,
            "message" : constants.MODEL_CREATE 
        },
        "data" : tagsCreated
    })


    }

    
    
    if(sl_array.includes(short_link))
    {
        return res.status(400).json({
            "status" : {
                "success" : false,
                "code" : 400,
                "message" : "cannot create duplicate shortlink"

            }
        })
    }



    const new_shortcut =  new Shortcut({
        _id : new mongoose.Types.ObjectId(),
        user_id : user._id,
        short_link : short_link,
        description : description,
        url : url,
        tags : tags
    })

    await new_shortcut.save()
    res.status(201).json({
        "status":{
            "success" : true,
            "code" : 201,
            "message" : constants.MODEL_CREATE 
        },
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

const query = ["short_link", "description", "tags"];       //query params available for filtering

router.get("/user",checkAuth,SF_Pag(Shortcut, query), async(req, res)=>{
    
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
                "data": res.Results
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


router.delete("/:shortcut_id", checkAuth, async(req, res)=>{
    
    try{

        //Finding shortcut by ID :
        const id = req.params.shortcut_id;
        const shortcut = await Shortcut.findById(id);
        console.log("135 shortcuts",shortcut)

        if (shortcut == null) {

            //Response if shortcut not found :
            res.status(400).json({
                "status": {
                    "success": false,
                    "code": 400,
                    "message": constants.MODEL_NOT_FOUND
                }
            });
        } else {

            await Shortcut.deleteOne({_id: id});

            //Response :
            res.status(200).json({
                "status": {
                    "success": true,
                    "code": 200,
                    "message": constants.MODEL_DELETE
                }
            });
        }

    //Error Catching :
    }catch(err){
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


router.get("/search",checkAuth,async(req,res)=>{
    try {
        const {attribute,value} = req.body;

    const result = await Shortcut.find({attribute : value})

    if(result)
    {
        res.status(200).json({
            "status": {
                "success": true,
                "code": 200,
                "message": constants.SUCCESSFUL
            },
            "data": result
        });

    }
    else
    {
        res.status(400).json({
            "status" : {
                "success" : true,
                "code" : 400,
                "message" : "Not Found"
            }
        })
    }
        
    } catch (err) {
        res.status(400).json({
            "status": {
                "success": false,
                "code": 400,
                "message": err.message
            }
        });
        console.log("97",err.message);
        
    }

     
})

router.get("/sort",checkAuth,async(req,res)=>{

    const {attribute,value,order} = req.body;

    var result = await Shortcut.find({attribute : value}).sort({vote: order})

    

})




module.exports=router;