const fsPromise = require("fs/promises");
const path = require("path");
const productsModel = require("../model/productsModel");

// /api/v1/products

exports.getProducts = async (req, res) => {
  try {
    
    const products = await productsModel.find({})
    // await new Promise((resolve, reject) => setTimeout(resolve,0));
    res.writeHead(200, { "Content-type": "application/json" });
    return res.end(JSON.stringify(products));
  } catch (err) {
    console.log(err.message);
  }
};
// /api/v1/product/:id

exports.getProduct = async (req, res) => {
  try {
    const product = await productsModel.findById({_id:req.params.id})
    if (product) {
      res.writeHead(200, { "Content-type": "application/json" });
      return res.end(JSON.stringify(product));
    } else {
      res.writeHead(404, { "Content-type": "application/json" });
      return res.end(JSON.stringify({ message: "Product not found" }));
    }
  } catch (err) {
    console.log(err.message);
  }
};
// URI = /api/v1/products/:category  and  METHOD = Get

exports.getCategory = async (req, res) => {
  try {
    const product = await productsModel.find({"category":req.params.category})
    if (product) {
      res.writeHead(200, { "Content-type": "application/json" }); 
      return res.end(JSON.stringify(product));
    } else {
      res.writeHead(404, { "Content-type": "application/json" });
      return res.end(JSON.stringify({ message: "Product not found" }));
    }
  } catch (err) {
    console.log(err.message);
  }
};

// URI= /api/v1/product  and Method = post
exports.createProduct = async (req, res) => {
  try {
    const {
      image,
      category,
      brand,
      color,
      title,
      ratings,
      price,
      offer,
      size,
      productdetails,
      materialandcare,
    } = req.body;
    const newProduct = {
      image,
      category,
      brand,
      color,
      title,
      ratings,
      price,
      offer,
      size,
      productdetails,
      materialandcare,
    };

    if (data.find((el) => el.image === newProduct.image)) {
      return res.redirect("/?product is already exist");
    }
    data.push(newProduct);
    await fsPromise.writeFile(
      path.join(__dirname, "..", "data", "products.json"),
      JSON.stringify(data)
    );
    return res.redirect("/?created");
  } catch (err) {
    console.log(err.message);
  }
};

// /api/v1/products/search and METHOD = Get
exports.searchProduct = async (req, res) => {
  try {
      let foundProducts=[]
      const search = req.params.search.trim().split(' ').filter((el)=>el!=="")
      const searchJoin =search.join(" ")
        foundProducts.push(...await productsModel.find({"category":{$regex:searchJoin,$options:"i"}}))
        foundProducts.push(...await productsModel.find({"title":{$regex:searchJoin,$options:"i"}}))
        foundProducts.push(...await productsModel.find({"color":{$regex:searchJoin,$options:"i"}}))
        foundProducts.push(...await productsModel.find({"brand":{$regex:searchJoin,$options:"i"}}))
      const products=foundProducts.reduce((final,current)=>{
        let obj = final.find((item)=>item.id===current.id)
        if(obj){
          return final
        }
        return final.concat([current])
    },[])
    if (products) {
      res.writeHead(200, { "Content-type": "application/json" });
      return res.end(JSON.stringify(products));
    } else {
      res.writeHead(404, { "Content-type": "application/json" });
      return res.end(JSON.stringify({ message: "Product not found" }));
    }
  } catch (err) {
    console.log(err.message);
  }
};
