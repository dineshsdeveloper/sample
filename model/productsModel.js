const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productsSchema = new Schema({
  image: String,
  category: String,
  brand: String,
  color: String,
  title: String,
  ratings: Number,
  price: Number,
  offer: Number,
  size: String,
  productdetails: String,
  materialandcare: String,
});
module.exports = model("products", productsSchema);
