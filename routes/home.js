const express = require('express');
const router  = express.Router();

const Product = require('../models/product')

router.get('/home', function(req, res, next) {
  console.log(req.session)
    const user = req.session.user || null
    res.render("home", user)
});

router.post('/search', function(req, res, next) {
   let product_name = req.body.productInput

  Product.find({
    product_name: {$regex: product_name}
  })
  .limit(15)
  .then( products =>{
    console.log(products)
      res.render('products', {products})
  })
});
 
module.exports = router;
