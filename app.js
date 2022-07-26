
//dependencies imported
const express = require("express");
var mongoose = require("mongoose")




var config = require("./config/default.json")
var UsersRouter = require("./routes/users");
var ShortcutRouter = require("./routes/shortcuts")


var app = express();




const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))// for parsing application/json

mongoose.connect(config.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true},function(err, conn){
    if(err){
        console.log("Mongo Connection Error", err);
    }
    if(!err && conn){
        console.log("Mongo Connection Established");
    }
});
app.use("/users",UsersRouter);
app.use("/shortcuts",ShortcutRouter);

app.get("/",(req,res)=>{
    res.send("Hello Oslash")
})



app.listen(3000)