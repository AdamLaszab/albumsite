const Artist = require("../models/artist");
const asyncHandler= require("express-async-handler");

exports.artist_list = asyncHandler(async(req,res,next)=>{
const AllArtists = await Artist.find({},"name").sort({name:1}).exec();

res.render("artist_list",{all_artists:AllArtists});
})
exports.artist_detail = asyncHandler(async(req,res,next)=>{
    res.send(`not implemented artist detail ${req.params.id}`);
})