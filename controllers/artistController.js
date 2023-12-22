const Artist = require("../models/artist");
const asyncHandler= require("express-async-handler");

exports.artist_list = asyncHandler(async(req,res,next)=>{
    res.send("not implemented artist list");
})
exports.artist_detail = asyncHandler(async(req,res,next)=>{
    res.send(`not implemented artist detail ${req.params.id}`);
})