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