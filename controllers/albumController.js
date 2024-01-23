const Album = require("../models/album");
const Artist = require("../models/artist");
const asyncHandler= require("express-async-handler");
const Genre = require("../models/genre");
const validator = require("express-validator");
const body = validator.body;
const validationResult = validator.validationResult;
exports.album_list = asyncHandler(async(req,res,next)=>{
const allAlbums = await Album.find({},"title artist summary genres").sort({title:1}).populate("artist genres").exec(); 
res.render("album_list",{title:"Album list",album_list:allAlbums});
})
exports.album_detail = asyncHandler(async(req,res,next)=>{
    const albumInfo = await Album.findOne({_id:req.params.id}).populate("artist").populate("genres").exec();
    res.render("album_info",{title:albumInfo.title,summary:albumInfo.summary,artist:albumInfo.artist.name,genres:albumInfo.genres,id:albumInfo._id}); 
})
exports.album_add_get= asyncHandler(async(req,res,next)=>{
    const AllGenres = await Genre.find({},"name").sort({name:1}).exec();
    const AllArtists = await Artist.find({},"name").sort({name:1}).exec();
    res.render("album_form",{title:"Album form",errors:undefined,genres:AllGenres,artists:AllArtists,currentAlbum:undefined});
})
exports.album_add_post=[body("name","genre name has to be longer than 1 characters").trim().isLength({min:1}).escape(),
    body("albumSummary","Summary cant be empty").trim().isLength({min:1}).escape()
 ,asyncHandler(async(req,res,next)=>{
    const errors = validationResult(req);
    const newAlbum = new Album({title:req.body.name,summary:req.body.albumSummary,artist:req.body.artist,genres:[req.body.genre]});
    if(!errors.isEmpty()){
        res.render("album_form",{title:"Album form",errors:errors.array()})
    }else{
        const albumExists = await Album.findOne({title:req.body.name,summary:req.body.albumSummary,artist:req.body.artist,genres:[req.body.genre]}).collation({locale:"en",strength:2}).exec();
        if(albumExists){
            res.redirect(albumExists.url);
        }else{
            await newAlbum.save();
            res.redirect(newAlbum.url);
        }
    }
})]
exports.album_update_get= asyncHandler(async(req,res,next)=>{
    const[currentAlbum,AllGenres,AllArtists]= await Promise.all(
        [Album.findOne({_id:req.params.id}).populate("artist").populate("genres").exec(),
        Genre.find({},"name").sort({name:1}).exec(),
        Artist.find({},"name").sort({name:1}).exec(),
    ]);
    if (currentAlbum === null) {
        // No results.
        const err = new Error("Album not found");
        err.status = 404;
        return next(err);
      }
    res.render("album_form",{title:"Album update",errors:undefined,genres:AllGenres,artists:AllArtists,currentAlbum:currentAlbum});
})

exports.album_update_post= asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED")
})