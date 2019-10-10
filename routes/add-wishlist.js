const express = require('express');
const router  = express.Router();
const User = require('../models/user.js')

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

module.exports = router;