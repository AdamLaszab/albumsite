const Genre = require("../models/genre");
const asyncHandler= require("express-async-handler");

exports.genre_list = asyncHandler(async(req,res,next)=>{
    const AllGenres = await Genre.find({},"name").sort({name:1}).exec();

    res.render("genre_list",{all_genres:AllGenres});
})
exports.genre_detail = asyncHandler(async(req,res,next)=>{
    res.send(`not implemented genre detail ${req.params.id}`);
})