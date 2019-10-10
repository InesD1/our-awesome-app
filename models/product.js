var mongoose = require("mongoose")

var productSchema = new mongoose.Schema(
    {
        product_name: String,
        brands: String,
        countries: String, 
        stores: [String],
        nutrient_levels: {
            salt: String,
            sugars: String, 
            fat: String,
            saturatedfat: String,
        },
        nutrition_grades_tags:[String], 
        code: String, 
        images: {
            front_fr: {
                rev: String,
            }
        }
    }
)
productSchema.index({ countries: 1})
const Product = mongoose.model("product", productSchema, 'cleanedUpFoods')

module.exports = Product