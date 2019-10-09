const express = require('express');
const router  = express.Router();
const Product = require('../models/product.js');
const mongoose = require("mongoose")


/* Read data from products details page */
router.get('/product/:productId', (req, res) => {
    Product.findById(req.params.productId)
      .then((product) => {
        res.render("product-details", {product})
        })
      .catch((err) => {
        res.send(err)
      })
  });

/*Edit product*/
router.get("/product/edit/:productId", (req, res)=> {
  Product.findById(req.params.productId)
  .then ((product) => {
    res.render("edit-product-details", {product})
    })
  })

  router.post("/product/edit", (req, res)=>{
    Product.findByIdAndUpdate(req.params.productId, req.body)
      .then((product)=> {
        res.redirect(`/product/${product.id}`)
      })
      .catch((err)=> {
        res.send(err)
      })
  })

module.exports = router;