const Genre = require("../models/genre");
const asyncHandler= require("express-async-handler");
const validator = require("express-validator");
const body = validator.body;
const validationResult = validator.validationResult;

exports.genre_list = asyncHandler(async(req,res,next)=>{
    const AllGenres = await Genre.find({},"name").sort({name:1}).exec();

    res.render("genre_list",{all_genres:AllGenres});
})
exports.genre_detail = asyncHandler(async(req,res,next)=>{
    res.send(`not implemented genre detail ${req.params.id}`);
})

exports.genre_add_get = (req,res,next)=>{
    res.render("genre_form",{title:"Genre form",errors:undefined});
}
exports.genre_add_post=[body("name","genre name has to be longer than 3 characters").trim().isLength({min:3}).escape() 
    ,asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req);

        const newgenre = new Genre({name:req.body.name});
        if(!errors.isEmpty()){
            res.render("genre_form",{title:"Genre form",errors:errors.array()});   
        }else{
            const genreExists = await Genre.findOne({name:req.body.name}).collation({locale:"en",strength:2}).exec();
            if(genreExists){
                res.redirect(genreExists.url);
            }else{
                await newgenre.save();
                res.redirect(newgenre.url);
            }
        }
})]