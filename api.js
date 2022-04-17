const express = require("express");
const User = require('./models/User');
const router = express.Router()

const mongoose = require("mongoose");
const dbLink = ""; //Add your mongoDB link here

mongoose.connect(dbLink, error => {
    if (error) {
        console.error("Database Not Available !");
    } else {
        console.log("Database Available !");
    }
});

router.get('/', (req, res) => {
    res.status(200).send('ok api');
});

router.post('/register', (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send("Invalid request !");
    } else {
        User.find({email: req.body.email},(error, result) => {
            if (error) {
                res.status(400);
            }
            if (result && result.length > 0) {
                res.status(400).send("Email already registerd !");
            } else {
                const userData = req.body;
                const user = new User(userData);
                user.save((error)=>{
                if (error) {
                    res.status(400);
                } else {
                    res.status(200).send({msg:"User Added!"});
                }});
            }
        });
    }
});

router.post('/login', (req,res) => {
    let userData = req.body
    User.findOne({email : userData.email, password : userData.password}, (error, user) => {
        if (error) {
            res.status(400);
        } else if (user) {
            res.send(user);
        } else {
            res.status(400).send("Invalid Records !");
        }
    });
});

module.exports = router;
