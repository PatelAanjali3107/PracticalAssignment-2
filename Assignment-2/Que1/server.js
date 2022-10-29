const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const ejs = require('ejs');

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

var storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,"uploads")
    },

    filename: function(req,res,cb){
        cb(null,res.fieldname+ "-" + Date.now() + ".jpg")
    }
});

const maxsize = 1;        //For 1kb
var upload = multer({
    storage: storage,
    limts: {
        fileSize: maxsize
    },
    fileFilter: function(req,res,cb){
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(res.mimetype);
        var extname = filetypes.test(path.extname(res.originalname).toLocaleLowerCase());
        if(mimetype && extname)
        {
            return cb(null,true);
        }

        cb("Error" );
    }
}).array("mypic",10);

app.get("/",function(req,res){
    res.render("singup");
})

app.post("/uploadProfile",function(req,res,next){
    upload(req,res,function(err){
       if(err){ 
          return res.send({message:"Uploaded file type is not valid."});
        }
        else{
            res.send({message:"File uploaded successfully"});
        }
    })
})

app.listen(8000,function(err){
    if(err)
    throw err
    console.log("Listening");
})