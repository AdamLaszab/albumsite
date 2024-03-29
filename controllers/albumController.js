const Album = require("../models/album");
const Artist = require("../models/artist");
const asyncHandler= require("express-async-handler");
const Genre = require("../models/genre");
const validator = require("express-validator");
const body = validator.body;
const validationResult = validator.validationResult;
exports.album_list = asyncHandler(async(req,res,next)=>{
const allAlbums = await Album.find({},"title artist summary genres").sort({title:1}).populate("artist genres").exec(); 
res.render("album_list",{title:"Album list",album_list:allAlbums,user:req.user});
})
exports.album_detail = asyncHandler(async(req,res,next)=>{
    const albumInfo = await Album.findOne({_id:req.params.id}).populate("artist").populate("genres").exec();
    res.render("album_info",{title:albumInfo.title,summary:albumInfo.summary,artist:albumInfo.artist.name,genres:albumInfo.genres,id:albumInfo._id,user:req.user}); 
})
exports.album_add_get= asyncHandler(async(req,res,next)=>{
    const AllGenres = await Genre.find({},"name").sort({name:1}).exec();
    const AllArtists = await Artist.find({},"name").sort({name:1}).exec();
    console.log(AllArtists);
    res.render("album_form_empty",{title:"Album form",errors:undefined,genres:AllGenres,artists:AllArtists,user:req.user});
})
exports.album_add_post=[body("name","album name has to be longer than 1 characters").trim().isLength({min:1}).escape(),
    body("albumSummary","Summary cant be empty").trim().isLength({min:1}).escape()
 ,asyncHandler(async(req,res,next)=>{
    if(req.user){
        if(req.user.admin !== true){
    res.render("album_form",{title:"Album form", errors:[{msg:"You need to be using an admin account to add new albums"}],user:req.user});
        }else{
     
    const errors = validationResult(req);
    const newAlbum = new Album({title:req.body.name,summary:req.body.albumSummary,artist:req.body.artist,genres:[req.body.genre]});
    if(!errors.isEmpty()){
        res.render("album_form",{title:"Album form",errors:errors.array(),user:req.user})
    }else{
        const albumExists = await Album.findOne({title:req.body.name,summary:req.body.albumSummary,artist:req.body.artist,genres:[req.body.genre]}).collation({locale:"en",strength:2}).exec();
        if(albumExists){
            res.redirect(albumExists.url);
        }else{
            await newAlbum.save();
            res.redirect(newAlbum.url);
        }
    }
}
}else{
    res.render("album_form",{title:"Album form", errors:[{msg:"You need to be logged in"}],user:req.user});
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
    res.render("album_form",{title:"Album update",errors:undefined,genres:AllGenres,artists:AllArtists,currentAlbum:currentAlbum,user:req.user});
})

exports.album_update_post=[
    body("name","album name has to be longer than 1 character").trim().isLength({min:1}).escape(),
    body("albumSummary","Summary cant be empty").trim().isLength({min:1}).escape(),
    asyncHandler(async(req,res,next)=>{
        const errors= validationResult(req);
        const updateAlbum = new Album({title:req.body.name,summary:req.body.albumSummary,artist:req.body.artist,genres:[req.body.genre],_id:req.params.id});
        if(errors.isEmpty()){
            const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, updateAlbum,{new:true});    
            res.redirect(updatedAlbum.url);
        }else{
             res.render("album_form",{title:"Album update",errors:errors,user:req.user});
        }
    })
]