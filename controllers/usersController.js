const asyncHandler= require("express-async-handler");
const validator = require("express-validator");
const body = validator.body;
const validationResult = validator.validationResult;
const User = require("../models/user");
const bcrypt = require("bcryptjs");
exports.user_register =[body("name","name has to be longer than 3 characters").trim().isLength({min:3}).escape(),
body("password","issue with the password").trim().escape()
,asyncHandler(async(req,res,next) => {
    const errors = validationResult(req);   
    if(!errors.isEmpty()){
        res.render("register_form",{title:"Register here",errors:errors.array()});
    }else{
        const userExists = await User.findOne({name:req.body.name}).collation({locale:"en",strength:2}).exec();
        if(userExists){
         res.render("register_form",{title:"Register here",errors:["User already exists"]});   
        }else{
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if(err){
            next(err);
        }else{
            const newUser = new User({username:req.body.name,password:hashedPassword});
            newUser.save();
        }
        res.redirect("/");
    });
        }
    }
})]

