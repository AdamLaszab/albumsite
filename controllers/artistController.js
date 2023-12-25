const Artist = require("../models/artist");
const asyncHandler= require("express-async-handler");
const validator = require("express-validator");
const body = validator.body;
const validationResult = validator.validationResult;

exports.artist_list = asyncHandler(async(req,res,next)=>{
const AllArtists = await Artist.find({},"name").sort({name:1}).exec();

res.render("artist_list",{all_artists:AllArtists});
})
exports.artist_detail = asyncHandler(async(req,res,next)=>{
    res.send(`not implemented artist detail ${req.params.id}`);
})

exports.artist_add_get = function(req,res,next){
    res.render("artist_form",{title:"Artist add",errors:undefined});
}
exports.artist_add_post = [
    body("name","name has to be longer than 3 characters").trim().isLength({min:3}).escape(),
    asyncHandler(async(req,res,next)=>{
    const errors = validationResult(req);
    
    const Artistnew = new Artist({name:req.body.name});

    if(!errors.isEmpty()){
        res.render("artist_form",{title:"Artist add",errors:errors.array()});
    }else{
        const artistExists = await Artist.findOne({name:req.body.name}).collation({locale:"en",strength:2}).exec();

        if(artistExists){
            res.redirect(artistExists.url);
        }else{
            await Artistnew.save();
            res.redirect(Artistnew.url);
        }
    }
})
] 