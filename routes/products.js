const express = require('express');
const router  = express.Router();
const Product = require('../models/product.js');

const mongoose = require("mongoose")

/* Read data from products page */
router.get("/products", (req, res, next)=> {
    console.log(req.session)
    const user = req.session.user || null
    
    Product.find({
        product_name: {$ne: null},
        countries: "France",
        brands: {$ne:null},
        _id: {$ne:null},
    })
    .limit(100)
    .select({brands:1, stores:1, product_name:1,nutrient_levels:1, nutrition_grades_tags:1, countries:1, code:1, images:1, _id:1})
        .then((products)=> {
          console.log(products)
          var productsCopy = [...products]
          debugger
          productsCopy = productsCopy.map((product)=> {
              product.image_url = imageStringBuilder(product)
              return product
          })
          res.render("products", {products: productsCopy, user})
        })
        .catch(err=> {
          console.log(err)
        })
});

/* Read data from products details page */
router.get('/product/:productName', (req, res) => {
  // Product.findById(req.params.productId) not working somehow
  Product.findOne({ product_name: req.params.productName })
    .limit(5000)  
    .then((product) => {
        console.log(product)
        const image_url = imageStringBuilder(product)
        res.render("product-details", {product, image_url})
        })
      .catch((err) => {
        res.send(err)
      })
});

/*Edit product*/
router.get("/product/edit/:productId", (req, res)=> {
  Product.findById(req.params.productId)
    .then ((product) => {
      res.render("edit-product", {product})
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

function imageStringBuilder(product) {
    debugger
    var productCode = product.code
    var productCodeSplit = `${productCode.slice(0,3)}/${productCode.slice(3,6)}/${productCode.slice(6,9)}/${productCode.slice(9,13)}`
    var fileName = `front_fr.${product.images.front_fr.rev}.full.jpg`
    var imageUrl = `https://static.openfoodfacts.org/images/products/${productCodeSplit}/${fileName}`
    return imageUrl
}

// var defaultQuery = {product_name:{$ne:""}, countries: "France", brands:{$ne:""}, _id:{$ne:null}}

// Object.assign(defaultQuery, {name: "Cereal"})