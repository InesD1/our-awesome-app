const express = require('express');
const router  = express.Router();
const User = require('../models/user.js')

router.get('/add-wishlist/:product', (req, res, next) => {
    console.log(req.params.product)
    User.findById(req.session.user,{$push: {wishlist: req.params.product}}, {new:true})
    .then((userInfo)=>{
        console.log(userInfo)
        res.redirect('/wishlist')
    })
    .catch((error)=>{
        console.log(error)
        res.render("error")
    })
});

router.get('/wishlist', (req,res) =>{
    User.findById(req.session.user)
    .then(user=>{
        let wishlists = user.wishlist
        console.log(wishlists)
        res.render('wishlist', {wishlists})
    })
    .catch(err => console.log(err))
})

module.exports = router;
