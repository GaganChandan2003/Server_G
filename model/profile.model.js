const mongoose = require('mongoose');

const profileModel = new mongoose.Schema({
    name: { type: String, required:true },
    age: { type: Number, required:true },
    date_of_birth: { type: String, required:true },
    contact: { type: Number, required:true },
    userId:{type:String, required:true}
})

const ProfileModel = mongoose.model("profile", profileModel);
module.exports = ProfileModel;