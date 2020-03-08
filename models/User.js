const mongoose = require("mongoose");

const  userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phoneno: String,
    gender: String
});

module.exports = mongoose.model('User', userSchema, 'User');