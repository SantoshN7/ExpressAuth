const express = require("express");
const User = require('./models/User');
const router = express.Router()

const mongoose = require("mongoose");
const dbLink = "mongodb+srv://root_user:Santayzoo@mongodb-h6asz.mongodb.net/DBAuth?retryWrites=true&w=majority";

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
        res.status(400).send('Invalid request !');
    } else {
        if (!User.find({email : req.body.email})) {
            const userData = req.body;
            const user = new User(userData);
            user.save((error)=>{
                if (error) {
                    res.status(400).send('Failed To Add Recored !');
                } else {
                    res.status(200).send('Success !');
                }
            });
        } else {
            res.status(400).send('Email already registerd !');
        }
    }
});

router.post('/login', (req,res) => {
    let userData = req.body
    User.findOne({email : userData.email, password : userData.password}, (error, user) => {
        if (error) {
            res.status(400).send(error);
        } else if (user) {
            res.status(200).send(user);
        } else {
            res.status(401).send('Invalid Records !');
        }
    });
});

module.exports = router;