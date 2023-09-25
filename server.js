const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const dbConnection = require("./db/dbConnection");
const productRoutes =require('./routes/productRoutes') 
const userRoutes = require('./routes/userRoutes');
const cookieParser = require("cookie-parser");

// middleware
dbConnection();
app.use(cors({origin:["https://mensfashionstore.netlify.app/"]}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
app.use(productRoutes)
app.use(userRoutes)
// app.use(express.static(path.join(__dirname,'build')))
// app.get("*",(req,res)=>{
//   res.sendFile(path.resolve(__dirname,"build",'index.html'))
// })

// exports
app.listen(PORT, (err) =>
  err ? console.log(err.message) : console.log(`server is running on ${PORT}`)
);
