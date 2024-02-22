const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  entity: { type: Schema.Types.ObjectId, required: true }, 
  rating: { type: Number, required: true },
});

const UserSchema = new Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
    admin: {type:Boolean,required:true},
    ratings:[RatingSchema]
})

module.exports = mongoose.model("User",UserSchema);