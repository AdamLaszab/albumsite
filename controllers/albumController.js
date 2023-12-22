const Album = require("../models/album");
const Artist = require("../models/artist");
const asyncHandler= require("express-async-handler");
const Genre = require("../models/genre");

exports.album_list = asyncHandler(async(req,res,next)=>{
    res.send("not implemented album list");
})
exports.album_detail = asyncHandler(async(req,res,next)=>{
    res.send(`not implemented album detail ${req.params.id}`);
})