const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const transporter = require("../mailer/mailer");
var jwt = require('jsonwebtoken');

router.post("/signup", (req,res)=> {
    User.findOne({$or: [{username: req.body.username, email: req.body.email}]})
        .then((user)=> {
            if(user) res.send("User with this email or username already exists.")
            else {
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    if(err) res.send(err.message)
                    else {
                        User.create({
                            username: req.body.username,
                            password: hash,
                            email: req.body.email,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname
                        })
                        .then((user)=> {
                            transporter.sendMail({
                                from: '"Foodie" <info@foodfinder.com>', 
                                to: user.email, 
                                subject: 'Welcome to Foodie! 🌱', 
                                text: 'Welcome to Foodie! 🌱',
                                html: `<b>Hello, ${user.firstname}, thank you for signing up! 😀.</b>`
                            })
                            .then((info)=> {
                                res.redirect("/login")
                            })
                            .catch((error)=> {
                                res.send(error)
                            })
                        })
                        .catch((err)=> {
                            res.send(err.message)
                        })
                    }
                })
            }
        })
    })   

router.get("/signup", (req,res)=> {
    res.render("auth/signup");
})

router.post("/login", (req,res)=> {
    User.findOne({username: req.body.username})
        .then((user)=> {
            console.log(user)
            if(!user) res.json({loggedIn: false}) 
            else {
                bcrypt.compare(req.body.password, user.password, function(err, equal) {
                    console.log(equal)
                    if(err) {res.send(err);}
                    else if(!equal){res.json({loggedIn: false});} 
                    else {
                        req.session.user = user;
                        res.redirect('/products')
                    }
                });
            }
        })
        .catch(err=> {
            res.send(err);
        })
})

router.get("/login", (req,res)=> {
    res.render("auth/login");
})
  
router.get("/logout", (req, res)=> {
    req.session.destroy();
    res.redirect("/login");
})

router.post("/email-availability", (req,res)=> {
    User.findOne({email: req.body.email})
        .then((user)=> {
            if(user)res.json({available: false})
            else res.json({available: true})
        })
})

router.get("/send-reset", (req,res)=> {
    res.render("auth/send-reset")
})

router.post("/send-reset", (req,res)=> {
    jwt.sign({email: req.body.email}, process.env.jwtSecret, { expiresIn: 60 * 60 }, function(err, token){
        transporter.sendMail({
            from: '"Foodie" <info@foodie.com>', 
            to: req.body.email, 
            subject: 'Reset your password 😀', 
            text: 'Reset your password 😀.', 
            html: `<b>Password reset for Foodie: <a href="http://localhost:3000/auth/reset-password?token=${token}">Reset your password</a></b>` 
        })
        .then((result)=> {
            console.log(result)
            res.send("Check your inbox to reset your password 😊")
        })
        .catch((err)=> {
            res.send(err)
        })
    })
})

router.get("/reset-password", (req,res)=> {
    res.render("auth/reset-password", {token: req.query.token})
})

router.post("auth/reset-password", (req,res)=> {
    jwt.verify(req.body.token, process.env.jwtSecret, function(err, token){
        if(err) res.send(err)
        bcrypt.hash(req.body.password, 10, function(err, hash){
            if(err) res.send(err)
            else {
                User.findOneAndUpdate({email: token.email}, {password: hash})
                .then((result)=> {
                    res.redirect("/auth/login")
                })
                .catch((err)=> {
                    res.send(err)
                })
            }
        })
    })
})

module.exports = router;