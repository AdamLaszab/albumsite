const Genre = require("../models/genre");
const asyncHandler= require("express-async-handler");

exports.genre_list = asyncHandler(async(req,res,next)=>{
    res.send("not implemented genre list");
})
exports.genre_detail = asyncHandler(async(req,res,next)=>{
    res.send(`not implemented genre detail ${req.params.id}`);
})