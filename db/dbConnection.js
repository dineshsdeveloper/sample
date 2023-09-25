const mongoose = require("mongoose");
const DATA_STRING =
  "mongodb+srv://Dineshs200104:i8g0ymAdMUhmb39B@cluster0.ayesaph.mongodb.net/ecommerce?retryWrites=true&w=majority";

const dbConnection = async () => {
  await mongoose
    .connect(DATA_STRING)
    .then(() => {
      console.log("mongodb Atlas connected");
    })
    .catch((err) => console.log(`your err is : ` + err.message));
};
module.exports = dbConnection;
