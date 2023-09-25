const express = require("express");
const route = express.Router()
const { getProducts, getProduct,getCategory,createProduct,searchProduct } = require("../controllers/ProductsController");
const path = require("path");

// api
route.use(express.static(path.join(__dirname,"../image")))
route.route("/api/v1/products").get(getProducts)
route.route("/api/v1/products/:category").get(getCategory);
route.route("/api/v1/products/search/:search").get(searchProduct)
route.route("/api/v1/product/:id").get(getProduct)
route.route("/api/v1/product").post(createProduct)



// exports
module.exports = route;
