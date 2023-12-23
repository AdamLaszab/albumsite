const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title:{type:String,require:true},
    summary:{type:String,require:true},
    artist:{type:Schema.Types.ObjectId,ref:"Artist"},
    genres:[{type:Schema.Types.ObjectId,ref:"Genre"}]

});

AlbumSchema.virtual("url").get(function(){
    return `/main/${this._id}`;
})

module.exports = mongoose.model("Album",AlbumSchema);