const asyncHandler= require("express-async-handler");
const validator = require("express-validator");
const body = validator.body;
const validationResult = validator.validationResult;
const User = require("../models/user");
const bcrypt = require("bcryptjs");
exports.user_register =[body("username","name has to be longer than 3 characters").trim().isLength({min:3}).escape(),
body("password","issue with the password").trim().escape()
,asyncHandler(async(req,res,next) => {
    const errors = validationResult(req);   
    if(!errors.isEmpty()){
        res.render("register_form",{title:"Register here",errors:errors.array(),user:req.user});
    }else{
        const userExists = await User.findOne({username:req.body.username}).collation({locale:"en",strength:2}).exec(); 
        if(userExists){
         res.render("register_form",{title:"Register here",errors:[{msg:"User already exists"}],user:req.user});   
        }else{
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if(err){
            next(err);
        }else{
            const newUser = new User({username:req.body.username,password:hashedPassword,admin:false});
            await newUser.save();
        }
        res.redirect("/");
    });
        }
    }
})]

