const express = require('express');
const router  = express.Router();
const User = require('../models/user.js')
const Product = require('../models/product.js')

router.get('/add-wishlist/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.session.user._id,{$push: {wishlist: req.params.id}}, {new:true})
    .then((userInfo)=>{
        console.log(userInfo)
        res.redirect('/products')
    })
    .catch((error)=>{
        res.render("error")
    })
});

router.get('/wishlist', (req,res) =>{
    User.findById(req.session.user._id)
    .populate('wishlist')
    .then(user=>{
        debugger
        console.log(user)
        res.render('wishlist', {wishlists:user.wishlist})
    })
    .catch(err => console.log(err))
})

module.exports = router;
