const express = require("express");
const User = require('./models/User');
const router = express.Router()

const mongoose = require("mongoose");
const dbLink = "mongodb+srv://root_user:gBhvZUiLrv1CLlym@mongodb-h6asz.mongodb.net/DBAuth?retryWrites=true&w=majority";

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
        res.send({msg:"Invalid request !"});
    } else {
        User.find({email: req.body.email},(error, result) => {
            if (error) {
                res.status(400);
            }
            if (result && result.length > 0) {
                res.send({msg:"Email already registerd !"});
            } else {
                const userData = req.body;
                const user = new User(userData);
                user.save((error)=>{
                if (error) {
                    res.status(400);
                } else {
                    res.send({msg:"User Added!"});
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
            res.send({msg:"Invalid Records !"});
        }
    });
});

module.exports = router;
