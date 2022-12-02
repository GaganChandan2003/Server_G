const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name: { type: String, required:true },
    email: { type: String, required:true },
    password: { type: String, required:true }
})

const UserModel = mongoose.model("user", userModel);
module.exports = UserModel;