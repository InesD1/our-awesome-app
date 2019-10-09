const express = require('express');
const router  = express.Router();
const Product = require('../models/product.js');

const mongoose = require("mongoose")

/* Read data from products page */
router.get("/products", (req, res, next)=> {
    console.log(req.session)
    const user = req.session.user || null
    
    Product.find({
        product_name: {$ne: ""},
        countries: "France",
        brands: {$ne:""},
        _id: {$ne:null},
    })
    .limit(5000)
    .select({brands:1, stores:1, product_name:1,nutrient_levels:1, nutrition_grades_tags:1, countries:1, code:1, images:1, _id:0})
        .then((products)=> {
          res.render("products", {products, user})
        })
        .catch(err=> {
          console.log(err)
        })
});

module.exports = router;

// function imageStringBuilder(product) {
//     var productCode = product.product
//     var productCodeSplit = `${productCode.slice(0,3)}/${productCode.slice(3,6)}/${productCode.slice(6,9)}/${productCode.slice(9,13)}`
//     var fileName = `front_fr.${product.images.front_fr.rev}.full.jpg`
//     var imageUrl = `https://static.openfoodfacts.org/images/products/${productCodeSplit}/${fileName}`
//     //https://static.openfoodfacts.org/images/products/020/111/704/5599/front_fr.4.full.jpg
//     return imageUrl
// }

// var defaultQuery = {product_name:{$ne:""}, countries: "France", brands:{$ne:""}, _id:{$ne:null}}

// Object.assign(defaultQuery, {name: "Cereal"})