const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ArtistSchema = new Schema({name:{type:String,required:true,maxLength:100}});


ArtistSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/main/artist/${this._id}`;
});

module.exports = mongoose.model("Artist", ArtistSchema);