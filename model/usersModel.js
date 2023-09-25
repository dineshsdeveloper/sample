const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  orders:Array,
  created_at:{type:Date,required:true,default:Date.now}
});

module.exports = model('users',userSchema)