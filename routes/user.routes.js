const express = require('express');
const UserModel = require('../model/user.model');
const userRoutes = express.Router();
require("dotenv").config();
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ProfileModel = require('../model/profile.model');
const authentication = require('../middleware/authentication');

userRoutes.post("/register", async (req, res) => {
    let { name, email, password } = req.body;
    const exists = await UserModel.findOne({ email });
    if (!exists) {
        bcrypt.hash(password, 6, async (err, hash) => {
            if (err) {
                return res.send("Please try again");
            }
            const user = new UserModel({
                name,
                email,
                password: hash
            })
            try {
                await user.save();
                res.status(200).send({ messege: "Registered in Successfully" });
            }
            catch {
                res.status(400)
            }
        })
    }
    else {
        res.status(400).send({ messege: "User already exists" })
    }


})
userRoutes.post("/login", async (req, res) => {
    let { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.send("Invalid Credentials").status(400)
    }
    const hash = user.password;
    const userId = user._id
    bcrypt.compare(password, hash, function (err, result) {
        if (result) {
            var token = jwt.sign({ email, userId }, process.env.SECRET);
            res.send({ messege: "Login Sucessfull", token: token }).status(200)
        }
        else {
            return res.send("Invalid Credentials").status(400);
        }
    });
})
userRoutes.get("/profile", authentication, async (req, res) => {
    let { userId } = req.body;
    let user = await ProfileModel.findOne({ userId });
    res.send({ data: user })
})
userRoutes.post("/profile", authentication, async (req, res) => {
    let { userId, name, age, date_of_birth, contact } = req.body;
    let user = await ProfileModel.findOne({ userId });
    if (!user) {
        let newProfile = new ProfileModel({
            name,
            age,
            date_of_birth,
            contact,
            userId
        })
        try {
            await newProfile.save();
            res.status(200).send({ messege: "Profile Created",data:newProfile })
        }
        catch {
            res.status(400)
        }
    }
    else {
        let updatedProfile = await ProfileModel.findOneAndUpdate({ userId }, req.body, { new: true });
        try {
            res.status(200).send({ messege: "Profile Updated", data: updatedProfile })
        }
        catch {
            res.status(400).send({ messege: "Something went wrong in updating" })
        }

    }
})
module.exports = userRoutes