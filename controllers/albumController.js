const Album = require("../models/album");
const Artist = require("../models/artist");
const asyncHandler= require("express-async-handler");
const Genre = require("../models/genre");

exports.album_list = asyncHandler(async(req,res,next)=>{
const allAlbums = await Album.find({},"title artist summary genres").sort({title:1}).populate("artist genres").exec(); 
res.render("album_list",{title:"Album list",album_list:allAlbums});
})
exports.album_detail = asyncHandler(async(req,res,next)=>{
    res.send(`not implemented album detail ${req.params.id}`);
})
exports.album_add_get= asyncHandler(async(req,res,next)=>{
    const AllGenres = await Genre.find({},"name").sort({name:1}).exec();
    const AllArtists = await Artist.find({},"name").sort({name:1}).exec();
    res.render("album_form",{title:"Album form",errors:undefined,genres:AllGenres,artists:AllArtists});
})
exports.album_add_post= asyncHandler(async(req,res,next)=>{
    res.send("not implemented"); 
})